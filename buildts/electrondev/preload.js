"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const index_1 = require("./index");
//const artistMgr = require("../models/artistMgr");
// Scan the root directory user selected
// This could be my main source of scanning any path
electron_1.contextBridge.exposeInMainWorld("fileApp", {
    sendNotification: (message) => {
        electron_1.ipcRenderer.send("notify", message);
    },
    getDirectoryRoot: async () => {
        const rootFolder = await electron_1.ipcRenderer.invoke("upload-files");
        const getData = await (0, index_1.getMetaData)(rootFolder);
        return getData;
    },
    // getNames: () => artistMgr.getNames(),
    // addArtist: (name: string) => artistMgr.addArtist(name),
});
//# sourceMappingURL=preload.js.map