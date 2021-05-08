import React from 'react';
import StateContainer from './StateContainer';
import RenderedContainer from './RenderedContainer';

// shows the selected React Component and it's props / state / methods

export default function Visualizer() {
  return (
    <div className='visualizer'>
      <StateContainer />
      <RenderedContainer />
    </div>
  );
}
