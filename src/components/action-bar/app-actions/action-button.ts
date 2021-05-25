import { ipcRenderer } from "electron"
import { fromEvent } from "rxjs"
import BaseButton from "../base-button"

export default class ActionButton extends BaseButton {
    static get observedAttributes(): Array<string> {
        return ["action"]
    }

    readonly action = this.getAttribute("action")

    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <button>
                ${this.iconMap(this.icon)}
            </button>
            <style>${this.baseStyle}</style>
        `

        fromEvent(this, "click")
            .subscribe(() => ipcRenderer.send(this.action))
    }
}

window.customElements.define("action-button", ActionButton)
