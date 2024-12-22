import React, { useState } from 'react';
import TodoList from '../components/TodoList';

function TodoPage() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Купить продукты', completed: false },
    { id: 2, title: 'Прочитать книгу', completed: false },
  ]);

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const addTodo = (e) => {
    e.preventDefault();
    const newTodo = { id: Date.now(), title: e.target.todo.value, completed: false };
    setTodos([...todos, newTodo]);
    e.target.todo.value = '';
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <form onSubmit={addTodo}>
        <input type="text" name="todo" placeholder="Add new task..." />
        <button type="submit">Add</button>
      </form>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default TodoPage;
