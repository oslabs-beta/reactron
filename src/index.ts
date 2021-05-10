const { app, BrowserWindow, dialog, Menu, Tray } = require('electron');
const fs = require('fs');
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

let mainWindow: {
  loadURL: (arg0: any) => void;
  webContents: {
    openDevTools: () => void;
    send: (arg0: string, arg1: any) => void;
  };
} = null;

const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1000,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

exports.getFile = () => {
  const files = dialog.showOpenDialog({
    properties: ['openDirectory'],
  });
  files.then((data: { filePaths: any[] }) => {
    const file = data.filePaths[0];
    openFile(file);
  });
};

const openFile = (file: any) => {
  const returnArr: string[] = [];
  const result = fs.readdirSync(file);
  result.forEach((elem: string) => {
    if (elem.includes('.', 1)) {
      returnArr.push(elem);
    } else if (elem[0] !== '.') {
      returnArr.push(...openFile(`${file}/${elem}`));
    }
  });
  console.log(returnArr);
  return returnArr;
  // result is array
  //openFile(file);
  //mainWindow.webContents.send('file-opened', result);
};

const mainMenuTemplate = [
  { label: 'Electron' },
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        },
      },
    ],
  },
];
