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
    res.status(500).send();
  }
});
app.post('/todos', async (req, res) => {
  try {
    const newTodo = req.body.todo;
    if (!newTodo) return res.status(400).send('Todo is required');
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
      res.status(500).send('Error in inserting to database.');
    }
  } catch (error) {
    res.status(400).send();
  }
});

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
});
