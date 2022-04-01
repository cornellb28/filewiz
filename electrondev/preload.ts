import { contextBridge, ipcRenderer } from "electron";
import * as fse from "fs-extra";
import { getMetaData } from "./index";

//const artistMgr = require("../models/artistMgr");

// Scan the root directory user selected
// This could be my main source of scanning any path

contextBridge.exposeInMainWorld("fileApp", {
  // button action to show
  getDirectoryRoot: () =>
    ipcRenderer
      .invoke("upload-files")
      .then(async (result: string) => {
        await getMetaData(result);
      })
      .catch((error) => {
        console.log("error message", error);
      }),
  //getNames: () => artistMgr.getNames(),
  //addArtist: (name: string) => artistMgr.addArtist(name),
});
