import BaseButton from "../base-button"
import { canvasToolEmitter } from "../../../emitter"

export default class ToolButton extends BaseButton {
    public button

    static get observedAttributes(): Array<string> {
        return ["type"]
    }

    readonly type = this.getAttribute("type")

    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <button id="tool-button-shadow" data-selected="false">
                ${this.iconMap(this.icon)}
            </button>
            <style>${this.baseStyle}</style>
        `
        this.button = shadowRoot.getElementById("tool-button-shadow")

        this.initEmit()
        this.listenChecked()
    }

    initEmit(): void {
        canvasToolEmitter.on("canvas-tool", event => {
            if (event.current !== this.type) {
                this.button.dataset.selected = "false"
            }
        })
    }

    listenChecked(): void {
        this.button.addEventListener("click", () => {
            if (this.button.dataset.selected === "false") {
                canvasToolEmitter.emit("canvas-tool", {
                    current: this.type
                })
                this.button.dataset.selected = "true"
            } else {
                this.button.dataset.selected = "false"
                canvasToolEmitter.emit("canvas-tool", {
                    current: "cursor"
                })
            }
        })
    }
}

window.customElements.define("tool-button", ToolButton)
