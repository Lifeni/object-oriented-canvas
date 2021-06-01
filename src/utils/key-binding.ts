import Mousetrap from "mousetrap"
import { newCanvas, openFile, saveAsFile, saveFile } from "./file-action"
import { canvasHistory } from "../store"

const startBinding = (): void => {
    Mousetrap.bind("mod+n", () => newCanvas())
    Mousetrap.bind("mod+o", () => openFile())
    Mousetrap.bind("mod+s", () => saveFile())
    Mousetrap.bind("mod+shift+s", () => saveAsFile())
    Mousetrap.bind("mod+z", () => canvasHistory.undo())
    Mousetrap.bind("mod+shift+z", () => canvasHistory.redo())
}

export { startBinding }
