import { ipcRenderer } from "electron"
import { fromEvent } from "rxjs"
import { canvasElement, canvasHistory } from "../../../store"

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
                    case "open-file": {
                        ipcRenderer.send("open-file")
                        ipcRenderer.once("open-file-data", (_, data) => {
                            const { file, name }: IPCOpenFileProps = data
                            canvasHistory.set(file)
                            canvasHistory.reDraw(file)
                        })
                        break
                    }
                    case "save-file": {
                        canvasHistory.save()
                        break
                    }
                    case "save-as-file" : {
                        canvasHistory.saveAs()
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
