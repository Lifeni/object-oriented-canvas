import BasePropertyBar from "../base-property-bar"

export default class LinePropertyBar extends BasePropertyBar {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <section>
                <h1>线</h1>
                <label>线宽度<input type="number" placeholder="2" value="2" /></label>
                <label>线颜色<input type="color" value="#000000" /></label>
            </section>
            ${this.stylesheet}
        `
    }
}

window.customElements.define("line-property-bar", LinePropertyBar)
