// Modules to control application life and create native browser window
import { BrowserWindow, app, ipcMain, dialog } from "electron";
import {
  Image,
  UserDefinedText,
  Artists,
  TrackTitle,
  Comment,
  Ratings,
  Samples,
} from "../src/types/TrackMeta";
import * as path from "path";
import * as glob from "glob";
import * as NodeID3 from "node-id3";
import * as sharp from "sharp";
import * as uniqid from "uniqid";
import * as _ from "lodash";

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
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
    //console.log(filepath[0]) returns etc "/Volumes/MUSICLITE/CAPITALRECORDS/90s"
    return new Promise<string[]>((resolve, reject) => {
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

  // create an interface to show object model
  interface TrackData {
    title: TrackTitle;
    artist: Artists;
    genre: string[];
    contentGroup: string[];
    year: string;
    initialKey: string;
    userDefinedText: UserDefinedText[];
    bpm: string;
    image: Image;
    publisher: string[];
    comment: Comment;
    composer: string[];
    remixArtist: string[];
    album: string;
    length: string;
    popularimeter: Ratings;
    favorite: boolean;
    SampleInfo: Samples;
    artistUrl: string[];
  }

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
    console.log(tags);
    // let audioObject = {
    //   ...tags,
    // };
    // const { image, comment } = audioObject;
    // if (
    //   typeof image === "undefined" ||
    //   typeof image === "string" ||
    //   typeof comment === "undefined" ||
    //   typeof comment === "string"
    // )
    //   continue;

    // const { text } = comment;
    // const { imageBuffer } = image;

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
