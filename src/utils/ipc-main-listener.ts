import { ipcMain } from "electron/main"
import { app, BrowserWindow, dialog } from "electron"
import fs from "fs"

const startListen = (window: BrowserWindow): void => {

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

    ipcMain.on("close-window", () => {
        window.close()
    })

    ipcMain.on("reload-window", () => {
        window.reload()
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

        dialog.showMessageBoxSync({
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

    ipcMain.on("export-image", (event, args: IPCExportImageProps) => {
        const { data, type } = args

        const file = dialog.showSaveDialogSync(
            {
                filters: [
                    { name: type.toUpperCase(), extensions: [type] },
                    { name: "All Files", extensions: ["*"] }
                ],
                properties: ["createDirectory"]
            }
        )

        if (file) {
            try {
                const base64 = data.replace(`data:image/${type};base64,`, "")
                fs.writeFileSync(file, base64, "base64")
            } catch (error) {
                console.error(error)
            }
        }
    })

    ipcMain.on("import-image", (event, id: string) => {
        const file = dialog.showOpenDialogSync(
            {
                filters: [
                    { name: "图片", extensions: ["webp", "png", "jpg", "jpeg", "gif"] },
                ],
                properties: ["openFile"]
            }
        )

        if (file) {
            try {
                const data = fs.readFileSync(file[0])
                event.sender.send("import-image-data", {
                    data: data.toString("base64"),
                    name: file[0],
                    id: id
                })
            } catch (error) {
                console.error(error)
            }
        }
    })

    ipcMain.on("open-file", (event, id: string) => {
        const file = dialog.showOpenDialogSync(
            {
                filters: [
                    { name: "JSON", extensions: ["json"] },
                ],
                properties: ["openFile"]
            }
        )

        if (file) {
            try {
                const data = fs.readFileSync(file[0])
                event.sender.send("open-file-data", {
                    file: JSON.parse(data.toString()),
                    name: file[0],
                    id: id
                })
            } catch (error) {
                console.error(error)
            }
        }
    })

    ipcMain.on("save-file", (event, args: IPCSaveFileProps) => {
        const { data, type, id, file } = args

        if (type === "save" && file) {
            try {
                fs.writeFileSync(file, JSON.stringify(data))
            } catch (error) {
                console.error("保存文件", file, error)
            }

        } else {
            const file = dialog.showSaveDialogSync(
                {
                    filters: [
                        { name: "JSON", extensions: ["json"] },
                        { name: "All Files", extensions: ["*"] }
                    ],
                    properties: ["createDirectory"]
                }
            )

            if (file) {
                try {
                    fs.writeFileSync(file, JSON.stringify(data))
                    event.sender.send("save-file-data", {
                        name: file,
                        id: id
                    })
                } catch (error) {
                    console.error("另存为文件", file, error)
                }
            }
        }
    })
}

export { startListen }
