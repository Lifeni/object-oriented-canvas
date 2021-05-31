import { canvasElement } from "../../store"

class TextInput {
    private readonly element: HTMLElement

    constructor(x: number, y: number, w: number, h: number, id: string) {
        this.element = document.createElement("text-input")

        this.element.style.left = `${x / window.devicePixelRatio}px`
        this.element.style.top = `${y / window.devicePixelRatio + canvasElement.get().getBoundingClientRect().y}px`
        this.element.style.width = `${w / window.devicePixelRatio}px`
        this.element.style.height = `${h / window.devicePixelRatio}px`

        this.element.dataset.id = id
    }

    mount(): void {
        document.body.append(this.element)
        setTimeout(() => {
            this.element.shadowRoot.getElementById("text-input").focus()
        }, 200)
    }

    unmount(): void {
        this.element.remove()
    }
}

export default TextInput
