const { contextBridge, ipcRenderer } = require('electron')

// NOTE: contextBridge  -> https://www.electronjs.org/docs/latest/api/context-bridge
// NOTE: ipc            -> https://www.electronjs.org/docs/latest/tutorial/ipc
// NOTE: ipcRenderer    -> https://www.electronjs.org/docs/latest/api/ipc-renderer

// NOTE: ipcRenderer invoke vs send -> https://stackoverflow.com/questions/45148110/how-to-add-a-callback-to-ipc-renderer-send/62630044#62630044

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping'),
})