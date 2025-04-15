import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const STORAGE_KEY = 'tasks';

function App() {
  const [tasks, setTasks] = useState([]);

  // ⏳ Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);
  const addTask = (task) => {
    setTasks(prev => {
      const updated = [...prev, task];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeTask = (taskToRemove) => {
    const updatedTasks = tasks.filter(task => task.id !== taskToRemove.id);
    setTasks(updatedTasks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks)); // 🔁 FIX: update localStorage too
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
  };

  const clearAll = () => {
    if (confirm('Are you sure you want to delete all tasks?')) {
      setTasks([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="container">
      <h1>To Do List 📝</h1>
      <TaskForm addTask={addTask} clearAll={clearAll} taskCount={tasks.length} />
      <TaskList tasks={tasks} removeTask={removeTask} updateTask={updateTask} />
    </div>
  );
}

export default App;
