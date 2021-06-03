import React from 'react';
export default function Completed(props) {
  return (
    <div className='task'>
      <h3>{props.value}</h3>
    </div>
  );
}
