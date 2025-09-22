import express from 'express';
import fetch from 'node-fetch';
import fs from 'fs/promises';
const app = express();
const port = process.env.PORT || 3000;
const pingURL = process.env.PING_URL || `http://localhost:3001/pings`;
const infoFilePath = process.env.INFO_FILE_PATH || './config/information.txt';
const randomString = Math.random().toString(36);

app.get('/', async (req, res) => {
  let pings;
  try {
    const response = await fetch(pingURL);
    const data = await response.json();
    pings = data.pings;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Could not fetch pings' });
  }
  let fileContent = '';
  try {
    fileContent = await fs.readFile(infoFilePath, 'utf-8');
  } catch (error) {
    console.log(error);
    fileContent = 'Error: Could not read file content';
  }

  const output = `file content: ${fileContent}\nenv variable: MESSAGE=${process.env.MESSAGE}\n${new Date().toISOString()}: ${randomString}.\nPing / Pongs: ${pings}`;
  res.type('text/plain');
  res.status(200).send(output);
});

app.listen(port, () => {
  console.log(`App listening to Port: ${port}`);
});
