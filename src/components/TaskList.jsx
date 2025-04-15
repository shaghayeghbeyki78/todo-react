import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, removeTask, updateTask }) {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          removeTask={removeTask}
          updateTask={updateTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;
