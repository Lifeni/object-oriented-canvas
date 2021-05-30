import Base from "../bases/base"

export default class TextPropertyBar extends Base {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <section>
                <h1>文本</h1>
                <label>字体大小<input type="number" placeholder="24" value="24" min="0" /></label>
                <label>字体<input type="text" placeholder="Inter" value="Inter" /></label>
                <label>字体颜色<input type="color" value="#000000" /></label>
                <label><input type="checkbox" />粗体</label>
                <label><input type="checkbox" />斜体</label>
            </section>
            ${this.stylesheet}
        `
    }
}

window.customElements.define("text-property-bar", TextPropertyBar)
