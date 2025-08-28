import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
console.log(__dirname);
console.log(path.join(__dirname, 'index.html'));
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
