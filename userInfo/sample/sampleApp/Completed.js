import React from 'react';
export default function Completed(props) {
  return (
    <div className='task'>
      <h3>{props.value || 'Default Task Value'}</h3>
    </div>
  );
}
