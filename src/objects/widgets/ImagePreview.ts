import { canvasElement } from "../../store"

class ImagePreview {
    private readonly element: HTMLElement
    private readonly image: HTMLImageElement

    constructor(id: string, data: IImportImageData) {
        this.element = document.createElement("image-preview")
        this.element.dataset.id = id

        this.image = this.element.shadowRoot.getElementById("image-preview") as HTMLImageElement
        this.image.src = `data:image/png;base64,${data.data}`
    }

    mount(): void {
        document.documentElement.append(this.element)
    }

    move(x: number, y: number): void {
        window.requestAnimationFrame(() => {
            this.element.style.left = `${x / window.devicePixelRatio}px`
            this.element.style.top = `${y / window.devicePixelRatio + canvasElement.get().getBoundingClientRect().y}px`
        })
    }

    unmount(): void {
        this.element.remove()
    }
}

export default ImagePreview
