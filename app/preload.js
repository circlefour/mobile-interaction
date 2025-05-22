const { contextBridge } = require('electron/renderer')

contextBridge.exposeInMainWorld('versions', {
  sendConfig: (data) => ipcRenderer.send('osc-config', data)
});
