import express from 'express';
const app = express();
const port = process.env.PORT || 3001;

let pingCount = 0;


app.get('/pingpong', (req, res) => {
  pingCount++;
  res.send({pings: pingCount})
});

app.get('/pings', (req, res) => {
  res.json({pings: pingCount})
})

app.listen(port, () => {
  console.log(`App listening to Port: ${port}`);
});
