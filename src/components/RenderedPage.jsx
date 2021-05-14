import React from 'react';
import Header from './Header.jsx';
import ComponentTree from './ComponentTree.jsx';
import Visualizer from './Visualizer.jsx';
import filesysHelpers from '../../filesysHelpers.js';

// Page that will show once directory has been imported
export default function RenderedPage() {
  console.log(
    filesysHelpers.result.staticFiles,
    filesysHelpers.result.componentFiles
  );
  return (
    <div className='renderedPage'>
      <Header />
      <ComponentTree />
      <Visualizer />
    </div>
  );
}
