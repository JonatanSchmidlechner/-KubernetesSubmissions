import express from 'express';
import fetch from 'node-fetch';
import { handleImageState } from '../services/imageManager.js';

const rootRouter = express.Router();
const todoBackendBaseURL =
  process.env.TODO_BACKEND_URL || 'http://localhost:3002';

rootRouter.get('/', async (req, res) => {
  await handleImageState();
  const response = await fetch(`${todoBackendBaseURL}/todos`);
  const data = await response.json();
  const todos = data.todos;

  res.status(200).render('index', {
    filePath: '/images/image.png',
    todos: todos,
  });
});

rootRouter.post('/todos', async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const response = await fetch(`${todoBackendBaseURL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      res
        .status(response.status)
        .send(response.message || 'Failed to create todo');
    }

    res.redirect('/');
  } catch (error) {
    console.log('Internal server error', error);
    res.status(500).send('Internal server error');
  }
});

rootRouter.get('/healthz', async (req, res) => {
  try {
    const response = await fetch(`${todoBackendBaseURL}/todos`);
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch todos' });
  }
});
export default rootRouter;
