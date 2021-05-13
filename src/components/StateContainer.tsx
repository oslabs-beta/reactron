import React from 'react';
import StateItem from './StateItem';

// conditional rendering based on how many state items

export default function StateContainer() {
  return (
    <div className='stateContainer'>
      <StateItem />
    </div>
  );
}
