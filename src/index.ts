const { app, BrowserWindow, dialog, Menu, Tray } = require('electron');
const fs = require('fs');
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

// declare mainWindow variable outside the createWindow function to persist
let mainWindow: {
  loadURL: (arg0: any) => void;
  webContents: {
    openDevTools: () => void;
    send: (arg0: string, arg1: any) => void;
  };
} = null;

// create window size and preferences
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

//Function to read file system and open directory of user's choosing
exports.getFile = () => {
  const files = dialog.showOpenDialog({
    //<--opens dialogue window to choose directory and sets that choice to 'files' and returns a promise
    properties: ['openDirectory'],
  });
  files.then((data: { filePaths: any[] }) => {
    // <--filepaths is an array from the returned user's choice
    const file = data.filePaths[0];
    openFile(file); //invoke helper function to open first (only?) returned file from dialogue
  });
};

const openFile = (file: string) => {
  //file here is a file path, could be directory or a single file
  const returnArr: string[] = []; //an array of strings
  const result = fs.readdirSync(file); //result is an array of arrays (which represent directorys) filled with file names
  result.forEach((elem: string) => {
    if (elem.includes('.', 1)) {
      //if there is a period in string past position 1 (so its not a hidden file) we push it to returnArr
      returnArr.push(elem); //because otherwise its a nested directory
    } else if (elem[0] !== '.' && elem !== 'node_modules') {
      //if its not a hidden file....
      returnArr.push(...openFile(`${file}/${elem}`)); //recursively call open again on the nested directory and push recursive results to returnArr.
    }
  });
  console.log(returnArr);
  return returnArr;
  // result is array
  // next step is to create another function to utilize the array of filenames
  // to use for the react fiber tree(react tree graph) and rendering page
  //openFile(file);
  //mainWindow.webContents.send('file-opened', result);
};

// from electronForge
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
