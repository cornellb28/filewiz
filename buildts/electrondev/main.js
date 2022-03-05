"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules to control application life and create native browser window
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const electron_window_state_1 = __importDefault(require("electron-window-state"));
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
// scan the directory and return the folder path
electron_1.ipcMain.handle("upload-files", async () => {
    // function to open dialog on click
    const dialogButton = await electron_1.dialog.showOpenDialog({
        properties: ["openDirectory", "createDirectory", "openFile"],
    });
    // user selected cancel button to show
    if (dialogButton.canceled)
        return;
    return dialogButton;
});
//# sourceMappingURL=main.js.map