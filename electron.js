const { app, BrowserWindow, Menu } = require('electron');

function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600
  });
  Menu.setApplicationMenu(null);
  win.setMenuBarVisibility(false);
  win.loadFile('./dist/alarm-report-client/index.html');
  win.on('closed', () => win = null);
}

app.on('ready', createWindow);