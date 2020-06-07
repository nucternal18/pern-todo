const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db.js');

//Specify port
const port = 5000;

//Middleware
app.use(cors());
app.use(express.json()); //req.body

//Routes//

// Create a todo
app.post('/api/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES($1) RETURNING *',
      [description],
    );

    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});
// Get all todo
app.get('/api/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');

    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// Get a todo
app.get('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const aTodos = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
      id,
    ]);

    res.json(aTodos.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// Update a todo
app.put('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updateTodo = await pool.query(
      'UPDATE todo SET description = $1 WHERE todo_id = $2',
      [description, id],
    );

    res.json('Todo was updated');
  } catch (error) {
    console.log(error.message);
  }
});

// Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [
      id,
    ]);

    res.json('Todo has been deleted');
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
