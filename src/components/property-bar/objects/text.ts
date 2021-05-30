import Base from "../bases/base"
import { textOption, TextOption } from "../../../store"
import { fromEvent } from "rxjs"

export default class TextPropertyBar extends Base {
    public textOption: TextOption = textOption

    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <section>
                <h1>文本</h1>

                <label>
                    字体大小
                    <input 
                        type="number" 
                        placeholder="24" 
                        value=${this.textOption.option.fontSize} 
                        min="1" 
                        id="font-size" 
                        data-option="fontSize" 
                    />
                </label>
                
                <label>
                    字体
                    <input 
                        type="text" 
                        placeholder="Inter" 
                        value=${this.textOption.option.fontFamily}  
                        id="font-family" 
                        data-option="fontFamily" 
                    />
                </label>
                
                <label>
                    字体颜色
                    <input 
                        type="color" 
                        value=${this.textOption.option.fontColor} 
                        id="font-color" 
                        data-option="fontColor" 
                    />
                </label>
                
                <label>
                    <input 
                        type="checkbox" 
                        ${this.textOption.option.isBold && `checked`} 
                        id="is-bold" 
                        data-option="isBold" 
                    />
                    粗体
                </label>
                
                <label>
                    <input 
                        type="checkbox" 
                        ${this.textOption.option.isItalic && `checked`} 
                        id="is-italic" 
                        data-option="isItalic" 
                    />
                    斜体
                </label>
            </section>
            ${this.stylesheet}
        `

        this.handleEvent(shadowRoot)
        this.handleBlur(shadowRoot)
    }

    handleEvent(shadow: ShadowRoot): void {
        const fontSize = shadow.getElementById("font-size")
        const fontFamily = shadow.getElementById("font-family")
        const fontColor = shadow.getElementById("font-color")
        const isBold = shadow.getElementById("is-bold")
        const isItalic = shadow.getElementById("is-italic")

        const observer = this.createObserver<TextOption>(this.textOption)

        fontSize && fromEvent(fontSize, "change").subscribe(observer)
        fontFamily && fromEvent(fontFamily, "change").subscribe(observer)
        fontColor && fromEvent(fontColor, "change").subscribe(observer)
        isBold && fromEvent(isBold, "change").subscribe(observer)
        isItalic && fromEvent(isItalic, "change").subscribe(observer)
    }
}

window.customElements.define("text-property-bar", TextPropertyBar)
