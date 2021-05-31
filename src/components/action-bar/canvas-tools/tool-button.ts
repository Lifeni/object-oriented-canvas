import BaseButton from "../base-button"
import { canvasEmitter } from "../../../emitter"
import { fromEvent } from "rxjs"

type ToolButtonStatus = "none" | "selected" | "show-property-bar"
type CanvasObjectName = "circle" | "rectangle" | "line" | "image" | "text" | "cursor" | "clear"
type CanvasObjectPropertyBarName = "circle" | "rectangle" | "line" | "text" | "none"

export default class ToolButton extends BaseButton {
    public button

    get status(): ToolButtonStatus {
        return this.button.dataset.status as ToolButtonStatus
    }

    set status(data: ToolButtonStatus) {
        this.button.dataset.status = data
    }

    static get observedAttributes(): Array<string> {
        return ["type", "property"]
    }

    readonly type = this.getAttribute("type") as CanvasObjectName
    readonly property = this.getAttribute("property") as CanvasObjectPropertyBarName

    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <button id="tool-button-shadow" data-status="none">
                ${this.iconMap(this.icon)}
            </button>
            ${this.baseStyle}
        `
        this.button = shadowRoot.getElementById("tool-button-shadow")

        this.initEmit()
        this.listenClick()
    }

    public canvasToolEmitter = (current: CanvasObjectName): void => {
        canvasEmitter.emit("canvas-tool", {
            current: current
        })
    }

    public propertyBarEmitter = (current: CanvasObjectPropertyBarName): void => {
        canvasEmitter.emit("property-bar", {
            current: current
        })
    }

    initEmit(): void {
        canvasEmitter.on("canvas-tool", event => {
            if (event.current !== "clear" && event.current !== this.type) {
                this.status = "none"
            }
        })
    }

    listenClick(): void {
        fromEvent(this.button, "click").subscribe(() => {
            if (!this.focusable || !this.property) {
                if (this.type !== "clear") {
                    this.propertyBarEmitter("none")
                }

                this.canvasToolEmitter(this.type)
            } else {
                if (this.status === "none") {
                    this.canvasToolEmitter(this.type)
                    this.propertyBarEmitter("none")
                    this.status = "selected"
                } else if (this.status === "selected") {
                    this.propertyBarEmitter(this.type as CanvasObjectPropertyBarName)
                    this.status = "show-property-bar"
                } else if (this.status === "show-property-bar") {
                    this.propertyBarEmitter("none")
                    this.status = "selected"
                }
            }
        })
    }
}

window.customElements.define("tool-button", ToolButton)
