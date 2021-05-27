import BaseButton from "../base-button"

export default class MenuButton extends BaseButton {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <button>
                ${this.iconMap(this.icon)}
            </button>
            ${this.baseStyle}
            ${this.menuButtonStyle}
        `
    }

    readonly menuButtonStyle = `
        <style>
            button:focus {
                background: #18a0fb;
            }
        </style>
    `
}

window.customElements.define("menu-button", MenuButton)
