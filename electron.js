const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const fs = require('fs');
const moment = require('moment');

function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 600,
    webPreferences: {
      zoomFactor: 1.25,
      nodeIntegration: true
    },
    icon: __dirname + '/src/assets/icon.ico'
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
      fs.readFile(result.filePaths[0], (_, data) => {
        event.reply('open-reply', JSON.parse(data, (key, value) => {
          if (value instanceof String) {
            const help = moment(value, 'YYYY-MM-DDTHH:mm', true);
            if (help.isValid())
              return help.toDate();
          }
          return value;
        }));
      });
    });
});

ipcMain.on('save', (event, args) => {
  if (args.id.length === 0) {
    console.warn('Id of alarm is empty, file will not be created');
  } else {
    console.log(`Write file into ${args.id}.rep`);
    const backup = Date.prototype.toJSON;
    Date.prototype.toJSON = function () { return moment(this).locale('de').format('YYYY-MM-DDTHH:mm'); }
    fs.writeFileSync(`/home/christoph/Documents/${args.id}.rep`, JSON.stringify(args));
    Date.prototype.toJSON = backup;
  }
});