import React from 'react';
import Header from './Header.jsx';
import ComponentTree from './ComponentTree.jsx';
import Visualizer from './Visualizer.jsx';
import filesysHelpers from '../../filesysHelpers.js';

// Page that will show once directory has been imported
export default function RenderedPage() {
  return (
    <div className='renderedPage' data-testid="RenderedPage" >
      <Header />
      <div className="container">
        <ComponentTree />
        <Visualizer />
      </div>
    </div>
  );
}
