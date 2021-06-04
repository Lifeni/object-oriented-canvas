import Base from "./Base"

class TextInput extends Base {
    constructor(x: number, y: number, w: number, h: number, id: string) {
        super(x, y, w, h, id, "text-input")
    }

    mount(): void {
        document.body.append(this.element)
        setTimeout(() => {
            this.element.shadowRoot.getElementById("text-input").focus()
        }, 200)
    }
}

export default TextInput
