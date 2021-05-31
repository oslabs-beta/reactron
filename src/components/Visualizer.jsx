import React from 'react';
import StateContainer from './StateContainer.jsx';
import RenderedContainer from './RenderedContainer.jsx';

// shows the selected React Component and it's props / state / methods

export default function Visualizer() {
  return (
    <div className='visualizer' data-testid="Visualizer" >
      <h2 className="Componentlabel">Entire Application</h2>
      {/* <StateContainer /> */}
      <RenderedContainer />
    </div>
  );
}
