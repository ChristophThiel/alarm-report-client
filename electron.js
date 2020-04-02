const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const fs = require('fs');

function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 600,
    webPreferences: {
      zoomFactor: 1.25,
      nodeIntegration: true
    }
  });
  /* win.once('ready-to-show', () => {
    win.webContents.setZoomFactor(1.25);
    win.show();
  }) */
  Menu.setApplicationMenu(null);
  win.setMenuBarVisibility(false);
  win.loadFile('./dist/alarm-report-client/index.html');
  win.on('closed', () => win = null);
}

app.on('ready', createWindow);

ipcMain.on('open', (event, args) => {
  dialog.showOpenDialog()
    .then(result => {
      console.log(result.filePaths[0]);
      fs.readFile(result.filePaths[0], (err, data) => {
        console.log(data.toString());
        event.reply('open-reply', data);
      });
    });
});

ipcMain.on('save', (event, args) => {
  if (args.id.length === 0) {
    console.warn('Id of alarm is empty, file will not be created');
  } else {
    console.log(`Write file into ${args.id}.rep`);
    fs.writeFileSync(`/home/christoph/Documents/${args.id}.rep`, JSON.stringify(args));
  }
});