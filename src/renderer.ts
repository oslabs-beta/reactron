/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

// renderer is needed to render files to react for electron
// import files here
import './index.scss';
import './main';

// IPC stands for inter-process communication
// ipcRenderer allows async rendering, listens from main processor
const { remote, ipcRenderer } = require('electron');

// ipcMain, event emitter, allows async main processing, will listen from the renderer

const mainProcess = remote.require('./index');

// selectMe button in RenderedPage
const testVar = document.getElementById('selectMe');
// onClick, populate the page with file contents
testVar.addEventListener('click', () => {
  mainProcess.testFile();
});

// ipcRenderer.on('file-opened', (event, ...args) => {
//   console.log(args)
// })

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack'
);