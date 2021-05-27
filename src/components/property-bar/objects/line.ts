export default class LinePropertyBar extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <property-bar>
                <label for="stroke-width">线宽度</label>
                <input type="number" placeholder="1" id="stroke-width" />
            </property-bar>
            ${this.stylesheet}
        `
    }

    readonly stylesheet = `
        <style>
            input {
                width: 48px;
                height: 24px;
            }
        </style>
    `
}

window.customElements.define("line-property-bar", LinePropertyBar)
