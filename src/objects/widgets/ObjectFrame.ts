import { canvasElement } from "../../store"

class ObjectFrame {
    public readonly element: HTMLElement
    private readonly dpr = window.devicePixelRatio
    private flag = 0

    constructor() {
        this.element = document.createElement("object-frame")
    }

    mount(): void {
        document.body.append(this.element)
    }

    move(x: number, y: number, w: number, h: number): void {
        if (this.flag === 0) {
            this.mount()
            this.flag = 1
        }

        this.element.style.left = `${x / this.dpr}px`
        this.element.style.top = `${y / this.dpr + canvasElement.get().getBoundingClientRect().y}px`
        this.element.style.width = `${w / this.dpr}px`
        this.element.style.height = `${h / this.dpr}px`
    }

    show(): void {
        this.element.classList.add("show")
    }

    hide(): void {
        this.element.classList.remove("show")
    }
}

export default ObjectFrame
