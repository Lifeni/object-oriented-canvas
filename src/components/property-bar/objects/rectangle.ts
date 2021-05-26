export default class RectanglePropertyBar extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <property-bar>
                <label for="stroke-width">线宽度</label>
                <input type="number" placeholder="1" id="stroke-width" />
            </property-bar>
        `
    }
}

window.customElements.define("rectangle-property-bar", RectanglePropertyBar)
