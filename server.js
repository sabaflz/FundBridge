import express from 'express';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Current working directory: ${__dirname}`);
});