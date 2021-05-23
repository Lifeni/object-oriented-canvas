import { ipcRenderer } from "electron"

export default class MenuItem extends HTMLElement {
    static get observedAttributes(): Array<string> {
        return ["action"]
    }

    readonly action = this.getAttribute("action")

    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
        <button role="menuitem">
            <slot></slot>
        </button>   
        <style>${this.stylesheet}</style>
        `

        this.addEventListener("click", () => {
            if (this.action) {
                ipcRenderer.send(this.action)
            }
        })
    }

    readonly stylesheet = `
        button {
            width: 100%;
            padding: 8px 16px;
            text-align: left;
            border: none;
            background: transparent;
            color: #fff;
            cursor: pointer;
            white-space: nowrap;
            outline: none;
        }
        
        button:hover {
            background: rgba(255, 255, 255, 0.1);
        }
    `
}

window.customElements.define("menu-item", MenuItem)
