import { ipcMain } from "electron/main"
import { app, BrowserWindow, dialog } from "electron"

const startListen = (window: BrowserWindow): void => {

    ipcMain.on("close-window", () => {
        window.close()
    })

    ipcMain.on("quit-app", () => {
        app.quit()
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

    ipcMain.on("toggle-devtools", () => {
        if (window.webContents.isDevToolsOpened()) {
            window.webContents.closeDevTools()
        } else {
            window.webContents.openDevTools()
        }
    })

    ipcMain.on("open-about-dialog", () => {
        const version = {
            chrome: process.versions["chrome"],
            electron: process.versions["electron"],
            node: process.versions["node"],
            platform: process.platform
        }

        dialog.showMessageBox({
            message: "Object-oriented Canvas\n",
            type: "info",
            title: "关于",
            detail: `这是一个基于面向对象分析与设计的画布 App，\n也是软件代码开发技术的课程设计。\n\n`
                + `开源协议：MIT License\n`
                + `项目地址：https://github.com/Lifeni/object-oriented-canvas\n\n`
                + `Electron = ${version.electron}\n`
                + `Chrome = ${version.chrome}\n`
                + `Node = ${version.node}\n`
                + `Platform = ${version.platform}\n`
        })
    })

}

export { startListen }
