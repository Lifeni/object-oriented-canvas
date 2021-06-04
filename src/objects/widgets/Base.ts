import { canvasElement } from "../../store"

class Base {
    public readonly element: HTMLElement
    private readonly dpr = window.devicePixelRatio

    constructor(x: number, y: number, w: number, h: number, id: string, name: string) {
        this.element = document.createElement(name)

        this.element.style.left = `${x / this.dpr}px`
        this.element.style.top = `${y / this.dpr + canvasElement.get().getBoundingClientRect().y}px`
        this.element.style.width = `${w / this.dpr}px`
        this.element.style.height = `${h / this.dpr}px`

        this.element.dataset.id = id
    }

    unmount(): void {
        this.element.remove()
    }
}

export default Base
