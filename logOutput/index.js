import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const randomString = Math.random().toString(36);

const printRandomStringIntervally = () => {
  console.log(`${new Date().toISOString()}: ${randomString}`);

  setTimeout(printRandomStringIntervally, 5000);
};
printRandomStringIntervally();
