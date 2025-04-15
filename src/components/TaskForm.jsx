import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toJalali } from '../utils/jalaliUtils';

function TaskForm({ addTask, clearAll, taskCount }) {
  const [text, setText] = useState('');
  const [date, setDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim() && date) {
      const jalaliDate = toJalali(date);

      const newTask = {
        id: Date.now(),
        text,
        date: jalaliDate,
        completed: false
      };

      addTask(newTask);
      setText('');
      setDate(null);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Enter your task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />

        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          placeholderText="Pick a date"
          calendarStartDay={6}
          dateFormat="yyyy/MM/dd"
          minDate={new Date()}
          className="datepicker"
        />

        {date && (
          <p style={{ color: 'green', fontSize: '0.9rem' }}>
            Selected date (Jalali): {toJalali(date)}
          </p>
        )}

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit">Add Task</button>
          <button
            type="button"
            onClick={clearAll}
            title="Clear All Tasks"
            disabled={taskCount < 2}
          >
            <FaTrashAlt color={taskCount < 2 ? '#ccc' : 'red'} />
          </button>
        </div>
      </form>
    </>
  );
}

export default TaskForm;
