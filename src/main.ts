import { app, BrowserWindow } from "electron"
import * as path from "path"
import { ipcMain } from "electron/main"

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
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

    ipcMain.on("close-window", () => {
        mainWindow.close()
    })

    ipcMain.on("minimize-window", () => {
        mainWindow.minimize()
    })

    ipcMain.on("maximize-window", () => {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize()
        } else {
            mainWindow.maximize()
        }
    })
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

