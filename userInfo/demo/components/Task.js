import React from 'react';
export default function Task(props) {
  return (
    <div className='task'>
      <h3>{props.value || 'Default Task Value'}</h3>
      <button onClick={() => props.completeTask(props.ID)}>Complete</button>
      <button onClick={() => props.deleteTask(props.ID)}>Remove</button>
    </div>
  );
}
