import React from 'react';
import Header from './Header';
import ComponentTree from './ComponentTree';
import Visualizer from './Visualizer';

// Page that will show once directory has been imported

export default function RenderedPage() {
  return (
    <div className='renderedPage'>
      <Header />
      <ComponentTree />
      <Visualizer />
    </div>
  );
}
