import { canvasContext, canvasFile, canvasHistory } from "../store"
import { canvasEmitter } from "../emitter"
import { v4 as uuidv4 } from "uuid"
import { ipcRenderer } from "electron"

const newCanvas = (): void => {
    canvasHistory.clear()
    canvasHistory.clearCanvas(canvasContext.ctx)

    canvasFile.clear()
    canvasFile.change()

    canvasEmitter.emit("canvas-tool", { current: "cursor" })
    canvasEmitter.emit("property-bar", { current: "cursor" })
}

const openFile = (): void => {
    const uuid = uuidv4()
    ipcRenderer.send("open-file", uuid)
    ipcRenderer.once("open-file-data", (_, data) => {
        const { file, name, id }: IPCOpenFileProps = data

        if (uuid === id) {
            canvasFile.set(name)
            canvasFile.save()

            canvasHistory.clear()
            canvasHistory.clearCanvas(canvasContext.ctx)
            canvasHistory.set(file)
            canvasHistory.reDraw(file)

            canvasEmitter.emit("canvas-tool", { current: "cursor" })
            canvasEmitter.emit("property-bar", { current: "cursor" })
        }
    })
}

const saveFile = (type: IPCSaveFileType): void => {
    const uuid = uuidv4()

    ipcRenderer.send("save-file", {
        type: type,
        data: canvasHistory.history,
        id: uuid,
        file: canvasFile.file
    })

    ipcRenderer.once("save-file-data", (_, data) => {
        const { name, id }: IPCSaveFileCallbackProps = data
        if (uuid === id) {
            canvasFile.set(name)
            canvasFile.save()

            canvasEmitter.emit("property-bar", { current: "self" })
        }
    })
}


export { newCanvas, openFile, saveFile }
