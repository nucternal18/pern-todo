import React, { Fragment, useState, useEffect } from 'react';
import EditTodo from './editTodo';

const ListTodos = () => {
    const [todos, setTodos] = useState([]);
    
    // Delete todo
    const deleteTodos = async (id) => {
      try {
          const deleteTodo = await fetch(`http://localhost:5000/api/todos/${id}`, {
            method: "DELETE"
        });

          setTodos(todos.filter(todo => todo.todo_id !== id));
      } catch (error) {
        console.error(error.message);
      }
    };

    // Get todos
  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/todos');
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos);
  return (
    <Fragment>
      <h1 className='text-center mt-5'>List Todos</h1>
      <table className='table table-dark table-hover mt-5 text-center '>
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.todo_id}</td>
              <td>{todo.description}</td>
              <td><EditTodo todo={todo} /></td>
              <td><button className="btn btn-danger" onClick={() => deleteTodos(todo.todo_id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
