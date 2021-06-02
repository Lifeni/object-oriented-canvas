import Base from "../bases/base"
import { canvasFile } from "../../../store"

export default class CursorPropertyBar extends Base {

    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <section>
                <h1>Canvas</h1>
                ${canvasFile.file ? `
                    <p class="saved-status ${canvasFile.saved ? "green" : "red"}" id="file-saved-status">
                        ${canvasFile.saved ? "已保存" : "未保存"}
                    </p>` : ` `}
                <p id="file-status">
                    ${canvasFile.file ? canvasFile.file : `画布未保存`}
                </p>
            </section>
            ${this.stylesheet}
        `

        this.handleBlur(shadowRoot)
    }
}

window.customElements.define("cursor-property-bar", CursorPropertyBar)
