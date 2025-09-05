import express from 'express';
import fetch from 'node-fetch';
import fs from 'fs/promises';
const app = express();
const port = process.env.PORT || 3000;
const pingURL = process.env.PING_URL | `http://localhost:3001/pings`;
const infoFilePath = process.env.INFO_FILE || './config/information.txt';
const randomString = Math.random().toString(36);

app.get('/', async (req, res) => {
  const response = await fetch(pingURL);
  const data = await response.json();
  let fileContent = '';
  try {
    fileContent = fs.readFile(infoFilePath, 'utf-8');
  } catch (error) {
    console.log(error);
    fileContent = 'Error: Could not read file content';
  }

  const output = `file content: ${fileContent}\nenv variable: MESSAGE=${process.env.MESSAGE}\n${new Date().toISOString()}: ${randomString}.\nPing / Pongs: ${data.pings}`;
  res.type('text/plain');
  res.send(output);
});

app.listen(port, () => {
  console.log(`App listening to Port: ${port}`);
});
