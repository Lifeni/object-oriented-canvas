import Base from "../bases/base"
import { fromEvent } from "rxjs"
import { PolygonOption } from "../../../store"

export default class PolygonPropertyBar extends Base {
    public polygonOption: PolygonOption

    constructor(name: string, store: PolygonOption) {
        super()
        this.polygonOption = store

        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <section>
                <h1>${name}形</h1>
                
                <label>
                    边框宽度
                    <input 
                        type="number" 
                        placeholder="2" 
                        value=${this.polygonOption.option.borderWidth} 
                        min="0" 
                        id="border-width" 
                        data-option="borderWidth" 
                    />
                </label>
                
                <label>
                    边框颜色
                    <input 
                        type="color" 
                        value=${this.polygonOption.option.borderColor} 
                        id="border-color" 
                        data-option="borderColor" 
                    />
                </label>
                
                <label>
                    填充颜色
                    <input 
                        type="color" 
                        value=${this.polygonOption.option.fillColor} 
                        id="fill-color" 
                        data-option="fillColor" 
                        class="hide"
                    />
                </label>
                
                <label>
                    <input 
                        type="checkbox" 
                        ${this.polygonOption.option.noFillColor && `checked`} 
                        id="no-fill-color" 
                        data-option="noFillColor" 
                    />
                    无填充
                </label>
                
                <label>
                    <input 
                        type="checkbox" 
                        ${this.polygonOption.option.isPerfectPolygon && `checked`} 
                        id="is-perfect-polygon" 
                        data-option="isPerfectPolygon" 
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
        const isPerfectPolygon = shadow.getElementById("is-perfect-polygon")

        const observer = this.createObserver<PolygonOption>(this.polygonOption)

        borderWidth && fromEvent(borderWidth, "change").subscribe(observer)
        borderColor && fromEvent(borderColor, "change").subscribe(observer)
        fillColor && fromEvent(fillColor, "change").subscribe(observer)
        noFillColor && fromEvent(noFillColor, "change").subscribe(observer)
        isPerfectPolygon && fromEvent(isPerfectPolygon, "change").subscribe(observer)
    }

    handleElementVisibility(shadow: ShadowRoot): void {
        const noFillColor = shadow.getElementById("no-fill-color")
        const fillColor = shadow.getElementById("fill-color")
        noFillColor && fromEvent(noFillColor, "change")
            .subscribe(() => fillColor.classList.toggle("hide"))
    }
}
