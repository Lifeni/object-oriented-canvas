import { ipcRenderer } from "electron"
import { fromEvent } from "rxjs"
import { canvasElement } from "../../../store"
import { newCanvas, openFile, saveFile } from "../../../utils/file-action"

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
                        ipcRenderer.send("export-image", {
                            data: canvasElement.exportFile(`image/${this.type}`),
                            type: this.type
                        })
                        break
                    }
                    case "new-canvas": {
                        newCanvas()
                        break
                    }
                    case "open-file": {
                        openFile()
                        break
                    }
                    case "save-file": {
                        saveFile("save")
                        break
                    }
                    case "save-as-file" : {
                        saveFile("save-as")
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
