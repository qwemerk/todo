// src/components/TodoItem.jsx
import React from 'react';
import "../index.css";
function TodoItem({ todo, toggleTodo, deleteTodo }) {
  

  return (
    <div className="TodoItem">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span>{todo.title}</span>
      <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
    </div>
  );
}

export default TodoItem;
