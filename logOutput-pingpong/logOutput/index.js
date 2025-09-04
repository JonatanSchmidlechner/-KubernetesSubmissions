import express from 'express';
import fetch from "node-fetch"
const app = express();
const port = process.env.PORT || 3000;
const pingURL = `http://:pingpong-svc/pings:2346/pings`
const randomString = Math.random().toString(36);

app.get('/', async (req, res) => {
  const response = await fetch(pingURL)
  const data = await response.json();
  const output = `${new Date().toISOString()}: ${randomString}.\nPing / Pongs: ${data.pings}`;
  res.type('text/plain');
  res.send(output);

});

app.listen(port, () => {
  console.log(`App listening to Port: ${port}`);
});
