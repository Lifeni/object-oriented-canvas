import { ipcMain } from "electron/main"
import { app, BrowserWindow } from "electron"

const startListen = (window: BrowserWindow): void => {

    ipcMain.on("close-window", () => {
        window.close()
    })

    ipcMain.on("minimize-window", () => {
        window.minimize()
    })

    ipcMain.on("maximize-window", () => {
        if (window.isMaximized()) {
            window.unmaximize()
        } else {
            window.maximize()
        }
    })

    ipcMain.on("open-devtools", () => {
        window.webContents.openDevTools()
    })

    ipcMain.on("quit-app", () => {
        app.quit()
    })
}

export { startListen }
