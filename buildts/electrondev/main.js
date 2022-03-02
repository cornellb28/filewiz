"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules to control application life and create native browser window
const electron_1 = require("electron");
const node_id3_1 = __importDefault(require("node-id3"));
const path_1 = __importDefault(require("path"));
const electron_window_state_1 = __importDefault(require("electron-window-state"));
const sharp_1 = __importDefault(require("sharp"));
const uniqid_1 = __importDefault(require("uniqid"));
const glob_1 = require("glob");
let mainWindow;
function createWindow() {
    let mainWindowState = (0, electron_window_state_1.default)({
        defaultWidth: 1400,
        defaultHeight: 700,
    });
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path_1.default.join(process.cwd(), "./buildts/electrondev/preload.js"),
        },
    });
    // and load the index.html of the app.
    mainWindow.loadFile(path_1.default.join(process.cwd(), "build/index.html"));
    mainWindowState.manage(mainWindow);
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on("activate", () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        electron_1.app.quit();
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
        return new Promise((resolve, reject) => {
            (0, glob_1.glob)("/**/*.+(mp3|m4a)", { root: filepath[0] }, (err, files) => {
                try {
                    resolve(files);
                }
                catch (error) {
                    reject(error);
                }
            });
        });
    }
    // user selected cancel button to show
    if (dialogButton.canceled)
        return;
    // User selected a filepath. continue -->
    const rootDir = dialogButton.filePaths; // Selected directory path
    const audioFiles = await scanDirectory(rootDir); // returns selected directory files (scanned)
    let tracks = [];
    for (let audioPath of audioFiles.slice(0, 50)) {
        // set a promise that resolve the promise if tags exist //
        const tags = await new Promise((resolve, reject) => {
            node_id3_1.default.read(audioPath, { noRaw: true }, (err, tags) => {
                // early exit
                if (err) {
                    console.log("nodeid3 issue", err);
                    reject(err);
                }
                resolve(tags);
            });
        });
        // early exit
        if (tags === null)
            continue; // tags does not exist move on to the next audio file
        let audioObject = {
            trackId: (0, uniqid_1.default)("track_"),
            location: audioPath,
            favorite: false,
            artist: tags.artist,
            fileType: tags.fileType,
            year: tags.year,
            genre: tags.genre,
            initialKey: tags.initialKey,
            trackLength: tags.length,
            bpm: tags.bpm,
            title: tags.title,
            contentGroup: tags.contentGroup,
            publisher: tags.publisher,
            composer: tags.composer,
            remixArtist: tags.remixArtist,
            album: tags.album,
            trackCover: tags.image,
            trackComments: tags.comment,
        };
        const { trackCover, trackComments } = audioObject;
        if (typeof trackCover === "undefined" || typeof trackCover === "string")
            continue;
        const { imageBuffer } = trackCover;
        let dataImageLarge = (0, sharp_1.default)(Buffer.from(imageBuffer)).resize(100);
        // let dataImageMedium = sharp(Buffer.from(imageBuffer)).resize(50)
        // let dataImageSmall = sharp(Buffer.from(imageBuffer)).resize(35)
        // let dataMime = mime.split('/')[1].toLowerCase()
        // await dataImage.toFile(`..covers/record-${id}.${dataMime}`)
        //const data = JSON.stringify(audioObject);
        const coverBuffer = await dataImageLarge.jpeg({ quality: 100 }).toBuffer();
        // const updatedFile = _.omit(audioObject, ["image", "comment"]);
        //const cover = `data:image/jpeg;base64,` + coverBuffer.toString("base64");
        tracks.push({ ...audioObject });
    }
    return tracks;
});
//# sourceMappingURL=main.js.map