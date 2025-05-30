import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the src/data directory exists
const dataDir = path.join(__dirname, 'src', 'data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const filePath = path.join(dataDir, 'survey_results.json');

app.post('/api/survey', (req, res) => {
  const data = req.body;
  let arr = [];
  if (fs.existsSync(filePath)) {
    arr = JSON.parse(fs.readFileSync(filePath));
  }
  arr.push(data);
  fs.writeFileSync(filePath, JSON.stringify(arr, null, 2));
  res.json({ status: 'ok' });
});

app.listen(4000, () => console.log('Server running on http://localhost:4000'));