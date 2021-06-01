import Mousetrap from "mousetrap"
import { newCanvas, openFile, saveAsFile, saveFile } from "./file-action"

const startBinding = (): void => {
    Mousetrap.bind("mod+n", () => newCanvas())
    Mousetrap.bind("mod+o", () => openFile())
    Mousetrap.bind("mod+s", () => saveFile())
    Mousetrap.bind("mod+shift+s", () => saveAsFile())
}

export { startBinding }
