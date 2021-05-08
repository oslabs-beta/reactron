import React from 'react';
import StateContainer from './StateContainer'
import RenderedContainer from './RenderedContainer'

export default function Visualizer() {
  return (
    <div>
      <StateContainer />
      <RenderedContainer />
    </div>
  );
}
