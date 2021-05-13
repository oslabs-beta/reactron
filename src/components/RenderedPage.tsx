import React from 'react';
import Header from './Header';
import ComponentTree from './ComponentTree';
import Visualizer from './Visualizer';
const electron = window.require('electron');
// allows async rendering, and listens from the main processor
const ipcRenderer = electron.ipcRenderer;

// Page that will show once directory has been imported

// exports RenderedPage with hook
export default function RenderedPage() {
  // allows async rendering, to listen from the main processor
  ipcRenderer.on('file-opened', (event: any, content: string) => {
    // reassign #hello to content rendered from ipcRenderer, the file uploaded
    console.log(content);
    document.getElementById('tester').innerHTML = content;
  });
  return (
    <div className='renderedPage'>
      {/* button selectMe in renderer.ts */}
      <button id='selectMe'>Click Me</button>
      <iframe id="tester"></iframe>
      <Header />
      <ComponentTree />
      <Visualizer />
    </div>
  );
}
