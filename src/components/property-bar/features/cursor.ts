import Base from "../bases/base"
import { canvasFile } from "../../../store"

export default class CursorPropertyBar extends Base {

    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <section>
                <h1>Canvas</h1>
                
                <div>
                    ${canvasFile.file ? `
                        <p class="status ${canvasFile.saved ? "green" : "red"}" id="file-saved-status">
                            ${canvasFile.saved ? "已保存" : "未保存"}
                        </p>` : ` `}
                    <p id="file-status">
                        ${canvasFile.file ? canvasFile.file : `提示：当前画布未保存，可以点击左上角菜单 -> 保存，或者按 Ctrl+S 进行保存`}
                    </p>
                </div>
            </section>
            ${this.stylesheet}
        `

        this.handleBlur(shadowRoot)
    }
}

window.customElements.define("cursor-property-bar", CursorPropertyBar)
