const { contextBridge } = require('electron');

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  versions: {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
  },
  // Add more APIs here as needed
  // Example: send: (channel, data) => {
  //   const { ipcRenderer } = require('electron');
  //   ipcRenderer.send(channel, data);
  // },
});
