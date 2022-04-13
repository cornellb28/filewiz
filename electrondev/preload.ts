import { contextBridge, ipcRenderer } from "electron";
import * as fse from "fs-extra";
import { getMetaData } from "./index";

//const artistMgr = require("../models/artistMgr");

// Scan the root directory user selected
// This could be my main source of scanning any path

contextBridge.exposeInMainWorld("fileApp", {
  sendNotification: (message: string) => {
    ipcRenderer.send("notify", message);
  },
  getDirectoryRoot: async () => {
    const rootFolder = await ipcRenderer.invoke("upload-files");
    const getData = await getMetaData(rootFolder);
    return getData;
  },
  // getNames: () => artistMgr.getNames(),
  // addArtist: (name: string) => artistMgr.addArtist(name),
});
