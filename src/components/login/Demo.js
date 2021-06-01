import React from 'react';
import { Link } from 'react-router-dom';

export default function Demo(props) {
  return (
    <div className='Demo'>
      <a onClick={() => props.useUsername('demo')}>Link to demo</a>
    </div>
  );
}
