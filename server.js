import express from 'express';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Configure CORS with more detailed options
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add error handling for CORS preflight
app.options('*', cors());

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.static('public'));

// Create data directory if it doesn't exist
const dataDir = join(__dirname, 'public', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('Created data directory:', dataDir);
}

app.post('/api/run-match-grants', (req, res) => {
  const scriptPath = join(__dirname, 'ai-models', 'match_grants.py');
  
  // Check if the script file exists
  if (!fs.existsSync(scriptPath)) {
    console.error(`Script file not found at: ${scriptPath}`);
    return res.status(500).json({ 
      error: 'Python script not found',
      details: `Expected path: ${scriptPath}`
    });
  }

  // Log the command that will be executed
  const command = `python3 "${scriptPath}"`;
  console.log(`Executing command: ${command}`);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('Error executing script:', error);
      console.error('Error code:', error.code);
      console.error('Error signal:', error.signal);
      return res.status(500).json({ 
        error: 'Failed to run match_grants.py',
        details: error.message,
        code: error.code,
        signal: error.signal
      });
    }
    
    if (stderr) {
      console.error('Script stderr:', stderr);
    }
    
    console.log('Script stdout:', stdout);

    // Check if the output file was created
    const outputPath = join(__dirname, 'ai-models', 'matched_grants.json');
    if (!fs.existsSync(outputPath)) {
      console.error('Output file not found:', outputPath);
      return res.status(500).json({ 
        error: 'Output file not created',
        details: `Expected path: ${outputPath}`
      });
    }

    // Copy the output file to the public directory
    try {
      fs.copyFileSync(outputPath, join(__dirname, 'public', 'matched_grants.json'));
      console.log('Successfully copied matched_grants.json to public directory');
    } catch (copyError) {
      console.error('Error copying output file:', copyError);
      return res.status(500).json({ 
        error: 'Failed to copy output file',
        details: copyError.message
      });
    }

    res.json({ 
      success: true, 
      message: 'Grants matched successfully',
      output: stdout
    });
  });
});

// Endpoint to run pairUsers.py
app.post('/api/run-pair-users', (req, res) => {
  console.log('Received request to run pairUsers.py');
  
  const scriptPath = join(__dirname, 'pairUsers.py');
  const outputPath = join(__dirname, 'matched_users.json');
  const publicOutputPath = join(__dirname, 'public', 'data', 'matched_users.json');

  // Check if script exists
  if (!fs.existsSync(scriptPath)) {
    console.error('Script not found:', scriptPath);
    return res.status(404).json({ error: 'Script not found' });
  }

  console.log('Current working directory:', process.cwd());
  console.log('Running script:', scriptPath);

  // Run the Python script
  exec(`python3 "${scriptPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error('Error executing script:', error);
      console.error('Script stderr:', stderr);
      return res.status(500).json({ 
        error: 'Failed to run script',
        details: error.message,
        stderr: stderr
      });
    }

    console.log('Script stdout:', stdout);

    // Check if output file was created
    if (!fs.existsSync(outputPath)) {
      console.error('Output file not found:', outputPath);
      return res.status(500).json({ error: 'Output file not created' });
    }

    try {
      // Read the output file
      const fileContents = fs.readFileSync(outputPath, 'utf8');
      const jsonData = JSON.parse(fileContents);

      // Validate the data structure
      if (!Array.isArray(jsonData)) {
        throw new Error('Invalid data format: expected an array of users');
      }

      // Copy the output file to the public directory
      fs.copyFileSync(outputPath, publicOutputPath);
      console.log('Successfully copied matched_users.json to public directory');
      
      res.json({ 
        message: 'Script executed successfully',
        data: jsonData
      });
    } catch (copyError) {
      console.error('Error processing output file:', copyError);
      return res.status(500).json({ 
        error: 'Failed to process output file',
        details: copyError.message
      });
    }
  });
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    details: err.message
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Current working directory: ${__dirname}`);
  console.log(`Public data directory: ${dataDir}`);
  console.log('CORS enabled for:', ['http://localhost:5173', 'http://127.0.0.1:5173']);
});