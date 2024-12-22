import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TodoPage from './pages/TodoPage';
import DndPage from './pages/DndPage';

function App() {
  return (
    <Router>
      <nav style={{ margin: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}>To-Do List</Link>
        <Link to="/dnd">Drag-and-Drop Tasks</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/dnd" element={<DndPage />} />
      </Routes>
    </Router>
  );
}

export default App;
  