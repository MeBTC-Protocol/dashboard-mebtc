import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  onUpdateDownloaded: (cb: () => void) => ipcRenderer.on('update-downloaded', cb),
  installUpdate: () => ipcRenderer.invoke('update-install')
})
