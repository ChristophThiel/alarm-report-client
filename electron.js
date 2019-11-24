const { app, BrowserWindow } = require('electron');

function createWindow () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.loadFile('./dist/alarm-report-client/index.html');
  win.on('closed', () => win = null);
}

app.on('ready', createWindow);