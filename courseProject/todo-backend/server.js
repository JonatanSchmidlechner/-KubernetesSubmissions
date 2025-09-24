import express from 'express';
import { pool } from './db/index.js';
import { initNats } from './nats/index.js';
import { JSONCodec } from 'nats';
const port = process.env.PORT || 3002;
const app = express();
app.use(express.json());
const conn = await initNats();

app.get('/todos', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM todos`);
    const todos = result.rows;
    res.json({ todos: todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/todos', async (req, res) => {
  const jc = JSONCodec();
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
      const savedTodo = result.rows[0];
      console.log('conn: ', conn);
      console.log('todo: ', savedTodo);
      conn.publish('alerts', jc.encode({ todo: savedTodo, type: 'save' }));
      res.status(201).json({ value: savedTodo });
    } else {
      res.status(500).json({ message: 'Error in inserting to database.' });
    }
  } catch (error) {
    res.status(400).json({
      message: 'Internal server error.',
    });
  }
});

app.put('/todos/:id', async (req, res) => {
  const jc = JSONCodec();
  const todoId = req.params.id;
  const doneValue = req.body.done;
  if (isNaN(todoId)) {
    return res.status(400).json({ message: 'Invalid todo id' });
  }
  try {
    const result = await pool.query(
      'UPDATE todos SET done = $1 WHERE id = $2 RETURNING *',
      [doneValue, todoId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    const updatedTodo = result.rows[0];
    conn.publish('alerts', jc.encode({ todo: updatedTodo, type: 'Update' }));
    res.status(200).json({ value: updatedTodo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database update failed' });
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
