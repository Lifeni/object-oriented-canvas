import { canvasEmitter } from "../../emitter"

export default class PropertyBar extends HTMLElement {

    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        this.switchBar("cursor", shadowRoot)

        canvasEmitter.on("property-bar", (event) => {
            this.switchBar(event.current, shadowRoot)
        })
    }

    switchBar(object: string, shadowRoot: ShadowRoot): void {
        switch (object) {
            case "line": {
                shadowRoot.innerHTML = `<line-property-bar></line-property-bar>`
                break
            }
            case "rectangle": {
                shadowRoot.innerHTML = `<rectangle-property-bar></rectangle-property-bar>`
                break
            }
            case "circle": {
                shadowRoot.innerHTML = `<circle-property-bar></circle-property-bar>`
                break
            }
            case "text": {
                shadowRoot.innerHTML = `<text-property-bar></text-property-bar>`
                break
            }
            default: {
                shadowRoot.innerHTML = ``
                break
            }
        }
    }
}

window.customElements.define("property-bar", PropertyBar)
