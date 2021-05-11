import React from 'react';
import Header from './Header';
import ComponentTree from './ComponentTree';
import Visualizer from './Visualizer';
const electron = window.require('electron');
// allows async rendering
const ipcRenderer = electron.ipcRenderer;

// Page that will show once directory has been imported

// exports RenderedPage with hook
export default function RenderedPage() {
  // allows async rendering
  ipcRenderer.on('file-opened', (event: any, content: string) => {
    // reassign #hello to content rendered from ipcRenderer, the file uploaded
    document.getElementById('hello').innerText = content;
  });
  return (
    <div className='renderedPage'>
      {/* button selectMe in renderer.ts */}
      <button id='selectMe'>Click Me</button>
      <div id='hello'></div>
      <Header />
      <ComponentTree />
      <Visualizer />
    </div>
  );
}
