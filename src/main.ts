import { app, BrowserWindow } from "electron"
import * as path from "path"
import { startListen } from "./utils/ipc-main-listener"

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        minWidth: 800,
        height: 600,
        minHeight: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
            contextIsolation: false
        },
        frame: false
    })

    mainWindow.loadFile(path.join(__dirname, "../index.html"))
        .then(() => {
            startListen(mainWindow)
        })
        .catch(console.error)

    if (!app.isPackaged) {
        mainWindow.webContents.openDevTools()
    }
}

app.on("ready", () => {
    createWindow()

    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

