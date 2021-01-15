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
      nodeIntegration: true,
      webSecurity: false
    },
    icon: `${__dirname}/dist/assets/icon.png`
  });

  Menu.setApplicationMenu(null);
  win.setMenuBarVisibility(false);
  win.loadFile(`${__dirname}/dist/index.html`);
}

app.whenReady().then(createWindow);

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
    let index = 0;
    const path = '/home/christoph/Documents/';

    let file = `${path}${args.id}.rep`;
    let exists = fs.existsSync(file);
    while (exists) {
      file = `${path}${args.id}-${++index}.rep`;
      exists = fs.existsSync(file);
    }

    console.log(`Write file into ${file}`);
    const backup = Date.prototype.toJSON;
    Date.prototype.toJSON = function () { return moment(this).locale('de').format('YYYY-MM-DDTHH:mm'); }
    fs.writeFileSync(file, JSON.stringify(args));
    Date.prototype.toJSON = backup;
  }
});
