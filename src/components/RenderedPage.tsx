import React from 'react';
import Header from './Header';
import ComponentTree from './ComponentTree';
import Visualizer from './Visualizer';

// Page that will show once directory has been imported
export default function RenderedPage() {
<<<<<<< HEAD
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
=======
return (
    <div className='renderedPage'>
>>>>>>> cdd30d08009d87f11450dd8edb7d455ea2e55c45
      <Header />
      <ComponentTree />
      <Visualizer />
    </div>
  );
}


