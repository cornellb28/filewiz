"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Modules to control application life and create native browser window
const electron_1 = require("electron");
const path = require("path");
const glob = require("glob");
const NodeID3 = require("node-id3");
const sharp = require("sharp");
const _ = require("lodash");
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new electron_1.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../public/index.html"));
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.whenReady().then(() => {
  createWindow();
  electron_1.app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (electron_1.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") electron_1.app.quit();
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// scan the directory for all files and folders
electron_1.ipcMain.handle("upload-files", async (event) => {
  // function to open dialog on click
  const dialogButton = await electron_1.dialog.showOpenDialog({
    properties: ["openDirectory", "createDirectory", "openFile"],
  });
  // Scan the root directory user selected
  async function scanDirectory(filepath) {
    //console.log(filepath[0]) returns etc "/Volumes/MUSICLITE/CAPITALRECORDS/90s"
    return new Promise((resolve, reject) => {
      glob("/**/*.mp3", { root: filepath[0] }, (err, files) => {
        try {
          resolve(files);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
  // user selected cancel button
  if (dialogButton.canceled) return;
  // User selected a filepath. continue -->
  const rootDir = dialogButton.filePaths; // Selected directory path
  const audioFiles = await scanDirectory(rootDir); // returns selected directory files (scanned)
  // empty array to send selection
  // const songs: TrackData {
  // };
  for (let audioPath of audioFiles.slice(0, 50)) {
    // set a promise that resolve the promise if tags exist //
    const tags = await new Promise((resolve, reject) => {
      NodeID3.read(audioPath, { noRaw: true }, (err, tags) => {
        // early exit
        if (err) {
          console.log("nodeid3 issue", err);
          reject(err);
        }
        resolve(tags);
      });
    });
    // early exit
    if (tags === null) continue; // tags does not exist move on to the next audio file
    let audioObject = {
      ...tags,
    };
    const { image, comment } = audioObject;
    if (
      typeof image === "undefined" ||
      typeof image === "string" ||
      typeof comment === "undefined" ||
      typeof comment === "string"
    )
      continue;
    const { text } = comment;
    const { imageBuffer } = image;
    let dataImageLarge = sharp(Buffer.from(imageBuffer)).resize(100);
    // let dataImageMedium = sharp(Buffer.from(imageBuffer)).resize(50)
    // let dataImageSmall = sharp(Buffer.from(imageBuffer)).resize(35)
    // let dataMime = mime.split('/')[1].toLowerCase()
    // await dataImage.toFile(`..covers/record-${id}.${dataMime}`)
    const data = JSON.stringify(audioObject);
    const coverBuffer = await dataImageLarge.jpeg({ quality: 100 }).toBuffer();
    const updatedFile = _.omit(audioObject, ["image", "comment"]);
    // songs.push({
    //   cover: `data:image/jpeg;base64,` + coverBuffer.toString('base64'),
    //   ...updatedFile,
    // })
  }
  //return songs;
});
//# sourceMappingURL=main.js.map
