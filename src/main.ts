import { app, BrowserWindow } from "electron"
import * as path from "path"
import { startListen } from "./utils/ipcMainListener"

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
        minWidth: 480,
        minHeight: 400,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
            contextIsolation: false
        },
        frame: false
    })

    mainWindow.loadFile(path.join(__dirname, "../index.html"))

    if (!app.isPackaged) {
        mainWindow.webContents.openDevTools()
    }

    startListen(mainWindow)
}

app.on("ready", () => {
    createWindow()

    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

