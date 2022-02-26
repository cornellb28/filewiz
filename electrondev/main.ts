// Modules to control application life and create native browser window
import { BrowserWindow, app, ipcMain, dialog } from "electron";
import NodeID3 from "node-id3";
import { TrackMeta } from "../src/types/TrackMeta";
import path from "path";
import windowStateKeeper from "electron-window-state";
import sharp from "sharp";
import uniqid from "uniqid";
import { glob } from "glob";
import _ from "lodash";

let mainWindowState = windowStateKeeper({
  defaultWidth: 1400,
  defaultHeight: 700,
});

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(process.cwd(), "./buildts/electrondev/preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(process.cwd(), "build/index.html"));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  mainWindowState.manage(mainWindow);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// scan the directory for all files and folders

ipcMain.handle("upload-files", async (event) => {
  // function to open dialog on click
  const dialogButton = await dialog.showOpenDialog({
    properties: ["openDirectory", "createDirectory", "openFile"],
  });

  // Scan the root directory user selected
  async function scanDirectory(filepath: string[]) {
    return new Promise<string[]>((resolve, reject) => {
      glob("/**/*.{mp3,m4a}", { root: filepath[0] }, (err, files: string[]) => {
        try {
          resolve(files);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  // user selected cancel button to show
  if (dialogButton.canceled) return;

  // User selected a filepath. continue -->
  const rootDir = dialogButton.filePaths; // Selected directory path
  const audioFiles = await scanDirectory(rootDir); // returns selected directory files (scanned)
  for (let audioPath of audioFiles.slice(0, 50)) {
    // set a promise that resolve the promise if tags exist //
    const tags = await new Promise<NodeID3.Tags | null>((resolve, reject) => {
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

    let audioObject: TrackMeta = {
      trackLength: tags.length,
      trackId: uniqid("track_"),
      location: audioPath,
      title: { name: tags.title, version: "" },
      artist: { artist: tags.artist, features: [] },
      genre: tags.genre,
      contentGroup: tags.contentGroup,
      publisher: tags.publisher,
      userDefinedText: tags.userDefinedText,
      bpm: tags.bpm,
      trackComments: tags.comment,
      composer: tags.composer,
      trackCover: tags.image,
      initialKey: tags.initialKey,
      remixArtist: tags.remixArtist,
      favorite: false,
      fileType: tags.fileType,
      SampleInfo: [{ sample_artist: "", sample_title: "" }],
    };

    const { trackCover, trackComments } = audioObject;
    if (
      typeof trackCover === "undefined" ||
      typeof trackCover === "string" ||
      typeof trackComments === "undefined" ||
      typeof trackComments === "string"
    )
      continue;

    const { text } = trackComments;
    const { imageBuffer } = trackCover;

    console.log(imageBuffer);
    console.log(text);

    // let dataImageLarge = sharp(Buffer.from(imageBuffer)).resize(100);
    // // let dataImageMedium = sharp(Buffer.from(imageBuffer)).resize(50)
    // // let dataImageSmall = sharp(Buffer.from(imageBuffer)).resize(35)
    // // let dataMime = mime.split('/')[1].toLowerCase()
    // // await dataImage.toFile(`..covers/record-${id}.${dataMime}`)

    // const data = JSON.stringify(audioObject);

    // const coverBuffer = await dataImageLarge.jpeg({ quality: 100 }).toBuffer();
    // const updatedFile = _.omit(audioObject, ["image", "comment"]);
    // songs.push({
    //   cover: `data:image/jpeg;base64,` + coverBuffer.toString('base64'),
    //   ...updatedFile,
    // })
  }
  //return songs;
});
