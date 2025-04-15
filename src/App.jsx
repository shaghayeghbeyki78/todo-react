import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const STORAGE_KEY = 'tasks';

function App() {
  const [tasks, setTasks] = useState([]);

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
    setTasks(tasks.filter(task => task.id !== taskToRemove.id));
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ));
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
