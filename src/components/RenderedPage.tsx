import React from 'react';
import Header from './Header';
import ComponentTree from './ComponentTree';
import Visualizer from './Visualizer';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

// Page that will show once directory has been imported

export default function RenderedPage() {
  ipcRenderer.on('file-opened', (event: any, content: string) => {
    document.getElementById('hello').innerText = content;
  });
  return (
    <div className='renderedPage'>
      <button id='selectMe'>Click Me</button>
      <div id='hello'></div>
      <Header />
      <ComponentTree />
      <Visualizer />
    </div>
  );
}
