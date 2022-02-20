import { contextBridge, ipcRenderer } from "electron";
//const artistMgr = require("../models/artistMgr");

contextBridge.exposeInMainWorld("fileApp", {
  // button action to show
  getDirectoryRoot: () => {
    console.log("hello");
    ipcRenderer.invoke("upload-files");
  },
  //getNames: () => artistMgr.getNames(),
  //addArtist: (name: string) => artistMgr.addArtist(name),
});
