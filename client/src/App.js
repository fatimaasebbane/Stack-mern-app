import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);

  // Fetch todos from backend
  useEffect(() => {
    axios.delete(`${process.env.REACT_APP_API_URL}/todos/${id}`)
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  }, []);

  // Add new todo to the list
  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  // Delete todo
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1>MERN Stack Todo App</h1>
      <TodoForm onAdd={addTodo} />
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.task}
            <FontAwesomeIcon
              icon={faTrash}
              className="delete-icon"
              onClick={() => deleteTodo(todo._id)}
              style={{ marginLeft: '10px', cursor: 'pointer', color: 'red' }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
