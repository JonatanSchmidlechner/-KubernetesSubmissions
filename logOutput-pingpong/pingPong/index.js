import express from 'express';
import fs from 'fs';
const app = express();
const port = process.env.PORT || 3001;
const filePath = process.env.FILE_PATH || 'pongCount.txt';
let pongCount;
try {
  const data = fs.readFileSync(filePath, 'utf-8');
  pongCount = parseInt(data) || 0;
} catch (err) {
  console.log('File not found or invalid, starting at 0');
}

app.get('/pingpong', (req, res) => {
  pongCount++;
  const pongCountAsString = pongCount.toString();
  fs.writeFile(filePath, pongCountAsString, (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.send(`pong ${pongCountAsString}`);
});

app.listen(port, () => {
  console.log(`App listening to Port: ${port}`);
});
