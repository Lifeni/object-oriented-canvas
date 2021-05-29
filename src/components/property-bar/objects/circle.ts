import BasePropertyBar from "../base-property-bar"

export default class CirclePropertyBar extends BasePropertyBar {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <section>
                <h1>圆形</h1>
                <label>边框宽度<input type="number" placeholder="2" value="2" min="0" /></label>
                <label>边框颜色<input type="color" value="#000000" /></label>
                <label>填充颜色<input type="color" disabled value="#ffffff" /></label>
                <label><input type="checkbox" checked />无填充</label>
                <label><input type="checkbox" />正圆</label>
            </section>
            ${this.stylesheet}
        `
    }
}

window.customElements.define("circle-property-bar", CirclePropertyBar)
