import { canvasElement } from "../../store"

class ObjectFrame {
    public readonly element: HTMLElement
    private readonly dpr = window.devicePixelRatio
    public mounted = 0
    public display = 0

    constructor() {
        this.element = document.createElement("object-frame")
    }

    mount(): void {
        document.body.append(this.element)
    }

    move(x: number, y: number, w: number, h: number): void {
        if (this.mounted === 0) {
            this.mount()
            this.mounted = 1
        }

        this.element.style.left = `${x / this.dpr}px`
        this.element.style.top = `${y / this.dpr + canvasElement.get().getBoundingClientRect().y}px`
        this.element.style.width = `${w / this.dpr}px`
        this.element.style.height = `${h / this.dpr}px`
    }

    show(): void {
        this.element.classList.add("show")
        this.display = 1
    }

    hide(): void {
        this.element.classList.remove("show")
        this.display = 0
    }
}

export default ObjectFrame
