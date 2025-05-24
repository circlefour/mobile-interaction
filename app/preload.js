const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('sockAPI', {
  sockConn: () => ipcRenderer.send('sockcon'),
  sockDiss: () => ipcRenderer.send('sockdis')
});
