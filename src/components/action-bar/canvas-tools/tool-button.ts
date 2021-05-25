import BaseButton from "../base-button"

export default class ToolButton extends BaseButton {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <input type="checkbox" role="button" id="menu-button-shadow" hidden/>
            <label for="menu-button-shadow">
                ${this.iconMap(this.icon)}
            </label>
            <slot part="menu"></slot>
            <style>${this.stylesheet}</style>
        `
    }
}

window.customElements.define("tool-button", ToolButton)
