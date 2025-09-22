import express from 'express';
import { pool } from './db/index.js';
const port = process.env.PORT || 3002;
const app = express();
app.use(express.json());

app.get('/todos', async (req, res) => {
  try {
    const result = await pool.query(`SELECT todo FROM todos`);
    const todos = result.rows.map((row) => {
      return row.todo;
    });
    res.json({ todos: todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/todos', async (req, res) => {
  try {
    const newTodo = req.body.todo;
    console.log(newTodo);
    if (!newTodo) return res.status(400).json({ message: 'Todo is required.' });
    if (typeof newTodo !== 'string') {
      return res.status(400).json({ message: 'Todo must be a string.' });
    }
    if (newTodo.length > 140)
      return res
        .status(400)
        .json({ message: 'Todo must be less than 140 characters.' });
    const query = {
      text: `
        INSERT INTO todos (todo)
        VALUES ($1)
        RETURNING *`,
      values: [newTodo],
    };
    const result = await pool.query(query);
    if (result.rowCount === 1) {
      res.status(201).send(result.rows[0]);
    } else {
      res.status(500).json({ message: 'Error in inserting to database.' });
    }
  } catch (error) {
    res.status(400).json({
      message: 'Internal server error.',
    });
  }
});

app.get('/healthz', async (req, res) => {
  try {
    const result = await pool.query('SELECT 1');
    return res.status(200).send();
  } catch (error) {
    return res.status(500).json({ message: 'Could not connect to database.' });
  }
});

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
});
