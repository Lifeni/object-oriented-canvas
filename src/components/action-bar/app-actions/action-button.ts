import { ipcRenderer } from "electron"
import { fromEvent } from "rxjs"
import BaseButton from "../base-button"

export default class ActionButton extends BaseButton {
    static get observedAttributes(): Array<string> {
        return ["action", "class"]
    }

    readonly action = this.getAttribute("action")
    readonly className = this.getAttribute("class")

    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <button class=${this.className || ""}>
                ${this.iconMap(this.icon)}
            </button>
            ${this.baseStyle}
        `

        fromEvent(this, "click")
            .subscribe(() => ipcRenderer.send(this.action))
    }
}

window.customElements.define("action-button", ActionButton)
