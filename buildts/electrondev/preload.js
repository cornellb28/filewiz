"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const artistMgr = require("../models/artistMgr");
electron_1.contextBridge.exposeInMainWorld("fileApp", {
    // button action
    getDirectoryRoot: () => electron_1.ipcRenderer.invoke("upload-files"),
    getNames: () => artistMgr.getNames(),
    addArtist: (name) => artistMgr.addArtist(name),
});
//# sourceMappingURL=preload.js.map