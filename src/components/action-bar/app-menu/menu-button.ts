import BaseButton from "../base-button"

export default class MenuButton extends BaseButton {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <button>
                ${this.iconMap(this.icon)}
            </button>
            <style>${this.stylesheet}</style>
        `
    }
}

window.customElements.define("menu-button", MenuButton)
