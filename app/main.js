const { io } = require("socket.io-client");
const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
      // if context isolation is true by default, i don't need to explicitly add it
    }
  })

  win.loadFile('index.html')
}

let socket = null

function handleSockConn(event) {
  socket = io('http://localhost:3000');
  
  socket.on('connect', () => {
    console.log('connecting to server');
    socket.emit('watcher', null);
  });
  
  socket.on('chaos', (data) => {
    console.log('chaos data:', data);
  });
  
  socket.on('disconnect', () => {
    console.log('socket disconnected');
  });
}

function handleSockDiss(event){
  if (!socket) return;
  socket.disconnect();
  socket = null;
}


app.whenReady().then(() => {
  createWindow()

  // necessary for macos
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  ipcMain.on('sockcon', handleSockConn)
  ipcMain.on('sockdis', handleSockDiss)
})


// necessary for windows and linux
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('osc-config', (event, config) => {
  console.log('received config from ui:', config);
  // set up osc logic here
});
