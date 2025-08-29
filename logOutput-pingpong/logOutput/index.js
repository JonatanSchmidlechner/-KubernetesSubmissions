import express from 'express';
import fs from 'fs';
const app = express();
const port = process.env.PORT || 3000;
const filePath = process.env.FILE_PATH || '../pingPong/pongCount.txt';
const randomString = Math.random().toString(36);

app.get('/log-output', (req, res) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const output = `${new Date().toISOString()}: ${randomString}.\nPing / Pongs: ${data}`;
      res.type('text/plain');
      res.send(output);
    }
  });
});

app.listen(port, () => {
  console.log(`App listening to Port: ${port}`);
});
