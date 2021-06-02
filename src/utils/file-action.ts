import { canvasContext, canvasFile, canvasHistory } from "../store"
import { canvasEmitter } from "../emitter"
import { v4 as uuidv4 } from "uuid"
import { ipcRenderer } from "electron"

const newCanvas = (): void => {
    canvasHistory.clear()
    canvasHistory.clearCanvas(canvasContext.ctx)

    canvasFile.file = null

    canvasEmitter.emit("canvas-tool", { current: "cursor" })
    canvasEmitter.emit("property-bar", { current: "none" })
}

const openFile = (): void => {
    const uuid = uuidv4()
    ipcRenderer.send("open-file", uuid)
    ipcRenderer.once("open-file-data", (_, data) => {
        const { file, name, id }: IPCOpenFileProps = data

        if (uuid === id) {
            canvasHistory.clear()
            canvasHistory.set(file)
            canvasHistory.clearCanvas(canvasContext.ctx)
            canvasHistory.reDraw(file)

            canvasEmitter.emit("canvas-tool", { current: "cursor" })
            canvasEmitter.emit("property-bar", { current: "none" })
            console.log("打开文件", name)
        }
    })
}

const saveFile = (): void => {
    ipcRenderer.send("save-file", {
        type: "save",
        data: canvasHistory.history,
    })
}

const saveAsFile = (): void => {
    ipcRenderer.send("save-file", {
        type: "save-as",
        data: canvasHistory.history,
    })
}

export {
    newCanvas,
    openFile,
    saveFile,
    saveAsFile
}
