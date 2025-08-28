import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const randomString = Math.random().toString(36);
  const output = `${new Date().toISOString()}: ${randomString}`;
  res.send(output);
});

app.listen(port, () => {
  console.log(`App listening to Port: ${port}`);
});
