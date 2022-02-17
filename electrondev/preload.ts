import { contextBridge, ipcRenderer } from 'electron'
const artistMgr = require('../models/artistMgr')

contextBridge.exposeInMainWorld('fileApp', {
  // button action
  getDirectoryRoot: () => ipcRenderer.invoke('upload-files'),
  getNames: () => artistMgr.getNames(),
  addArtist: (name: string) => artistMgr.addArtist(name),
})
