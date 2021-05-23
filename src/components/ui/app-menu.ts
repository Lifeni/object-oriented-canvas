export default class AppMenu extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <action-button icon="menu"></action-button>
            <style>${this.stylesheet}</style>
        `
    }

    readonly stylesheet = `

    `
}

window.customElements.define("app-menu", AppMenu)
