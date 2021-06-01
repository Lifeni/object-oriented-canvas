import Base from "../bases/base"
import { fromEvent } from "rxjs"
import { ShapeOption } from "../../../store"

export default class ShapePropertyBar extends Base {
    public shapeOption: ShapeOption

    constructor(name: string, store: ShapeOption) {
        super()
        this.shapeOption = store

        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <section>
                <h1>${name}形</h1>
                
                <label>
                    边框宽度
                    <input 
                        type="number" 
                        placeholder="2" 
                        value=${this.shapeOption.option.borderWidth} 
                        min="0" 
                        id="border-width" 
                        data-option="borderWidth" 
                    />
                </label>
                
                <label>
                    边框颜色
                    <input 
                        type="color" 
                        value=${this.shapeOption.option.borderColor} 
                        id="border-color" 
                        data-option="borderColor" 
                    />
                </label>
                
                <label>
                    填充颜色
                    <input 
                        type="color" 
                        value=${this.shapeOption.option.fillColor} 
                        id="fill-color" 
                        data-option="fillColor" 
                        class="hide"
                    />
                </label>
                
                <label>
                    <input 
                        type="checkbox" 
                        ${this.shapeOption.option.noFillColor && `checked`} 
                        id="no-fill-color" 
                        data-option="noFillColor" 
                    />
                    无填充
                </label>
                
                <label>
                    <input 
                        type="checkbox" 
                        ${this.shapeOption.option.isPerfectShape && `checked`} 
                        id="is-perfect-shape" 
                        data-option="isPerfectShape" 
                    />
                    正${name}
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
        const isPerfectShape = shadow.getElementById("is-perfect-shape")

        const observer = this.createObserver<ShapeOption>(this.shapeOption)

        borderWidth && fromEvent(borderWidth, "change").subscribe(observer)
        borderColor && fromEvent(borderColor, "change").subscribe(observer)
        fillColor && fromEvent(fillColor, "change").subscribe(observer)
        noFillColor && fromEvent(noFillColor, "change").subscribe(observer)
        isPerfectShape && fromEvent(isPerfectShape, "change").subscribe(observer)
    }

    handleElementVisibility(shadow: ShadowRoot): void {
        const noFillColor = shadow.getElementById("no-fill-color") as HTMLInputElement
        const fillColor = shadow.getElementById("fill-color")

        const check = () => {
            if (noFillColor.checked) {
                fillColor.classList.add("hide")
            } else {
                fillColor.classList.remove("hide")
            }
        }

        check()
        noFillColor && fromEvent(noFillColor, "change")
            .subscribe(() => check())
    }
}
