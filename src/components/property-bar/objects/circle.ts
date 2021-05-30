import BasePropertyBar from "../bases/base-property-bar"
import { fromEvent } from "rxjs"
import { circleOption } from "../../../store"

export default class CirclePropertyBar extends BasePropertyBar {
    public option = circleOption

    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <section>
                <h1>圆形</h1>
                
                <label>
                    边框宽度
                    <input 
                        type="number" 
                        placeholder="2" 
                        value=${this.option.option.borderWidth} 
                        min="0" 
                        id="border-width" 
                        data-option="borderWidth" 
                    />
                </label>
                
                <label>
                    边框颜色
                    <input 
                        type="color" 
                        value=${this.option.option.borderColor} 
                        id="border-color" 
                        data-option="borderColor" 
                    />
                </label>
                
                <label>
                    填充颜色
                    <input 
                        type="color" 
                        value=${this.option.option.fillColor} 
                        id="fill-color" 
                        data-option="fillColor" 
                        class="hide"
                    />
                </label>
                
                <label>
                    <input 
                        type="checkbox" 
                        ${this.option.option.noFillColor && `checked`} 
                        id="no-fill-color" 
                        data-option="noFillColor" 
                    />
                    无填充
                </label>
                
                <label>
                    <input 
                        type="checkbox" 
                        ${this.option.option.isPerfectCircle && `checked`} 
                        id="is-perfect-circle" 
                        data-option="isPerfectCircle" 
                    />
                    正圆
                </label>
            </section>
            ${this.stylesheet}
        `

        this.handleEvent(shadowRoot)
        this.handleElementVisibility(shadowRoot)

        this.handleBlur(shadowRoot)
    }

    handleEvent(shadow: ShadowRoot): void {
        const borderWidth = shadow.getElementById("border-width")
        const borderColor = shadow.getElementById("border-color")
        const fillColor = shadow.getElementById("fill-color")
        const noFillColor = shadow.getElementById("no-fill-color")
        const isPerfectCircle = shadow.getElementById("is-perfect-circle")

        const observer = (event: Event) => {
            const target = event.target as HTMLInputElement
            if (target.type === "checkbox") {
                this.option.setOption({ ...this.option.option, [target.dataset.option]: target.checked })
            } else if (target.type === "number") {
                this.option.setOption({ ...this.option.option, [target.dataset.option]: Number(target.value) })
            } else {
                this.option.setOption({ ...this.option.option, [target.dataset.option]: target.value })
            }
        }

        borderWidth && fromEvent(borderWidth, "change").subscribe(observer)
        borderColor && fromEvent(borderColor, "change").subscribe(observer)
        fillColor && fromEvent(fillColor, "change").subscribe(observer)
        noFillColor && fromEvent(noFillColor, "change").subscribe(observer)
        isPerfectCircle && fromEvent(isPerfectCircle, "change").subscribe(observer)
    }

    handleElementVisibility(shadow: ShadowRoot): void {
        const noFillColor = shadow.getElementById("no-fill-color")
        const fillColor = shadow.getElementById("fill-color")
        noFillColor && fromEvent(noFillColor, "change")
            .subscribe(() => fillColor.classList.toggle("hide"))
    }
}

window.customElements.define("circle-property-bar", CirclePropertyBar)
