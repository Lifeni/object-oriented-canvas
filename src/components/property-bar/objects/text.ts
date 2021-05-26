export default class TextPropertyBar extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <property-bar>
                <label for="font-size">字体大小</label>
                <input type="number" placeholder="24" id="font-size" />
            </property-bar>
        `
    }
}

window.customElements.define("text-property-bar", TextPropertyBar)
