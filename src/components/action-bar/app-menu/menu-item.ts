import { ipcRenderer } from "electron"
import { fromEvent } from "rxjs"
import { canvasContext, canvasElement, canvasFile, canvasHistory } from "../../../store"
import { canvasEmitter } from "../../../emitter"
import { v4 as uuidv4 } from "uuid"

export default class MenuItem extends HTMLElement {
    static get observedAttributes(): Array<string> {
        return ["action", "type"]
    }

    readonly action = this.getAttribute("action")
    readonly type = this.getAttribute("type")

    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <button role="menuitem">
                <slot></slot>
            </button>   
            ${this.stylesheet}
        `

        fromEvent(this, "click")
            .subscribe(() => {
                switch (this.action) {
                    case "export-image": {
                        ipcRenderer.send(this.action, {
                            data: canvasElement.exportFile(`image/${this.type}`),
                            type: this.type
                        })
                        break
                    }
                    case "new-canvas": {
                        canvasHistory.clear()
                        canvasHistory.clearCanvas(canvasContext.ctx)
                        canvasFile.file = null
                        canvasEmitter.emit("canvas-tool", { current: "cursor" })
                        canvasEmitter.emit("property-bar", { current: "none" })
                        break
                    }
                    case "open-file": {
                        const uuid = uuidv4()
                        ipcRenderer.send("open-file", uuid)
                        ipcRenderer.once("open-file-data", (_, data) => {
                            const { file, name, id }: IPCOpenFileProps = data

                            if (uuid === id) {
                                canvasHistory.set(file)
                                canvasHistory.reDraw(file)
                                canvasEmitter.emit("canvas-tool", { current: "cursor" })
                                canvasEmitter.emit("property-bar", { current: "none" })
                                console.log("打开文件", name)
                            }
                        })
                        break
                    }
                    case "save-file": {
                        ipcRenderer.send("save-file", {
                            type: "save",
                            data: canvasHistory.history,
                            file: canvasFile.file
                        })
                        break
                    }
                    case "save-as-file" : {
                        ipcRenderer.send("save-file", {
                            type: "save-as",
                            data: canvasHistory.history,
                            file: canvasFile.file
                        })
                        break
                    }
                    default: {
                        ipcRenderer.send(this.action)
                        break
                    }
                }

            })
    }

    readonly stylesheet = `
        <style>
            button {
                width: 100%;
                padding: 6px 48px 6px 18px;
                text-align: left;
                border: none;
                background: transparent;
                color: #fff;
                font-family: inherit;
                cursor: pointer;
                white-space: nowrap;
                outline: none;
            }
            
            button:hover {
                background: rgba(255, 255, 255, 0.1);
            }
        </style>
    `
}

window.customElements.define("menu-item", MenuItem)
