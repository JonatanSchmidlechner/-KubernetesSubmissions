import express from 'express';

const app = express();
const port = process.env.PORT || 3002;

const todos = ['Learn Javascript', 'Learn React', 'Build a project'];

app.use(express.json());

app.get("/todos", (req, res) => {
    console.log("GET todos")
    res.json({todos: todos})
})
app.post("/todos", (req, res) => {
    console.log("POST todos")
    try {
        const newTodo = req.body.todo;
        todos.push(newTodo);
        res.status(200).send();
    } catch (error) {
        res.status(400).send()
    }
})

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
});