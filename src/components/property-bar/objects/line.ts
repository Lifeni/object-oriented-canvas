import Base from "../bases/base"
import { lineOption, LineOption } from "../../../store"
import { fromEvent } from "rxjs"

export default class LinePropertyBar extends Base {
    public lineOption: LineOption = lineOption

    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <section>
                <h1>线</h1>
                
                <label>
                    线宽度
                    <input 
                        type="number" 
                        placeholder="2" 
                        value=${this.lineOption.option.lineWidth} 
                        min="1" 
                        id="line-width" 
                        data-option="lineWidth" 
                    />
                </label>
                
                <label>
                    边框颜色
                    <input 
                        type="color" 
                        value=${this.lineOption.option.lineColor} 
                        id="line-color" 
                        data-option="lineColor" 
                    />
                </label>
            </section>
            ${this.stylesheet}
        `

        this.handleEvent(shadowRoot)
        this.handleBlur(shadowRoot)
    }

    handleEvent(shadow: ShadowRoot): void {
        const lineWidth = shadow.getElementById("line-width")
        const lineColor = shadow.getElementById("line-color")

        const observer = (event: Event) => {
            const target = event.target as HTMLInputElement
            if (target.type === "number") {
                this.lineOption.setOption({
                    ...this.lineOption.option,
                    [target.dataset.option]: Number(target.value)
                })
            } else {
                this.lineOption.setOption({ ...this.lineOption.option, [target.dataset.option]: target.value })
            }
        }

        lineWidth && fromEvent(lineWidth, "change").subscribe(observer)
        lineColor && fromEvent(lineColor, "change").subscribe(observer)
    }
}

window.customElements.define("line-property-bar", LinePropertyBar)
