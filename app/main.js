const { io } = require("socket.io-client");
const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const osc = require('osc');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 300,
    height: 200,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
      // if context isolation is true by default, i don't need to explicitly add it
    }
  })

  win.loadFile('index.html')
}

let socket = null
let udpPort = null;

function handleSockConn(event) {
  const backend = "https://mobile-interaction.onrender.com";
  //socket = io("https://chaos-server-dev.up.railway.app/");
  //socket = io('http://localhost:3000');
  socket = io(backend);

  udpPort = new osc.UDPPort({
    remoteAddress: "127.0.0.1",
    remotePort: 8000
  });

  udpPort.open();
  
  socket.on('connect', () => {
    console.log('connected to server');
    socket.emit('watcher', null);
  });
  
  socket.on('chaos', (chaos) => {
    console.log('chaos value received', chaos);
    udpPort.send({
      address: "/chaos/average",
      args: [
        {
          type: "f", // float
          value: chaos
        }
      ]
    });
  });
  
  socket.on('disconnect', () => {
    console.log('socket disconnected');
  });
}

function handleSockDiss(event){
  if (udpPort) {
    udpPort.close();
    udpPort = null;
  }
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
