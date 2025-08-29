import express from 'express';

const app = express();
const port = process.env.PORT || 3001;
let pongCount = 0;
app.get('/pingpong', (req, res) => {
  res.send(`pong ${pongCount}`);
  pongCount++;
});

app.listen(port, () => {
  console.log(`App listening to Port: ${port}`);
});
