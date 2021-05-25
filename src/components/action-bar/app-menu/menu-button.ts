import BaseButton from "../base-button"

export default class MenuButton extends BaseButton {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <button>
                ${this.iconMap(this.icon)}
            </button>
            <style>${this.baseStyle}</style>
            <style>${this.menuButtonStyle}</style>
        `
    }

    readonly menuButtonStyle = `
        button:focus {
            background: #18a0fb;
        }
    `
}

window.customElements.define("menu-button", MenuButton)
