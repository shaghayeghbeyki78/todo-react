import React from 'react';
import { FaTimes, FaPencilAlt } from 'react-icons/fa';

function TaskItem({ task, removeTask, updateTask }) {
  const handleComplete = () => {
    updateTask({ ...task, completed: !task.completed });
  };

  const handleEdit = () => {
    const newText = prompt('Edit task:', task.text);
    if (newText && newText.trim()) {
      updateTask({ ...task, text: newText.trim() });
    }
  };

  return (
    <li className={task.completed ? 'completed' : ''}>
      <div className="top-row">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleComplete}
        />
        <span onClick={handleComplete}>{task.text}</span>
      </div>
      <div className="bottom-row">
        <span onClick={handleComplete}>Due: {task.date}</span>
        <div>
          <button onClick={handleEdit} title="Edit Task" disabled={task.completed}>
            <FaPencilAlt color={task.completed ? '#ccc' : '#007bff'} />
          </button>
          <button onClick={() => removeTask(task)} title="Delete Task">
            <FaTimes color="red" />
          </button>
        </div>
      </div>
    </li>
  );
}

export default TaskItem;
