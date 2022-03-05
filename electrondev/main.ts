// Modules to control application life and create native browser window
import { BrowserWindow, app, ipcMain, dialog } from "electron";
import NodeID3 from "node-id3";
import trackMeta from "../src/types";
import path from "path";
import windowStateKeeper from "electron-window-state";
import sharp from "sharp";
import uniqid from "uniqid";
import { glob } from "glob";
import _ from "lodash";

let mainWindow: BrowserWindow;

function createWindow() {
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1400,
    defaultHeight: 700,
  });
  // Create the browser window.
  mainWindow = new BrowserWindow({
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

// scan the directory and return the folder path
ipcMain.handle("upload-files", async () => {
  // function to open dialog on click
  const dialogButton = await dialog.showOpenDialog({
    properties: ["openDirectory", "createDirectory", "openFile"],
  });

  // user selected cancel button to show
  if (dialogButton.canceled) return;
  return dialogButton;
});
