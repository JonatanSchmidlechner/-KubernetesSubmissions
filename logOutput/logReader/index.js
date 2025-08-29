import express from 'express';
import fs from 'fs';
const app = express();
const port = process.env.PORT || 3000;
const filePath = process.env.FILE_PATH || '../logWriter/randomLog.txt';

app.get('/log-output', (req, res) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.type('text/plain');
      res.send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`App listening to Port: ${port}`);
});
