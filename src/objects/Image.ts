import Base from "./bases/Base"
import ImagePreview from "./widgets/ImagePreview"

class ImageObject extends Base {
    public imagePreview: ImagePreview
    public imageData: IImportImageData

    public flag = 0

    constructor(ctx: CanvasRenderingContext2D, id: string, data: IImportImageData) {
        super(ctx)

        this.imageData = data
        this.imagePreview = new ImagePreview(id, data)
        this.imagePreview.mount()

        this.flag = 1
    }

    follow(x: number, y: number): void {
        this.imagePreview.move(x + 24, y - 24)
    }

    draw(x: number, y: number): void {
        if (this.flag) {
            const image = new Image()
            image.src = `data:image/png;base64,${this.imageData.data}`
            image.onload = () => {
                const ratio = image.width / image.height
                this.ctx.drawImage(image, x, y,
                    Math.min(image.width, (window.innerWidth * this.dpr - x - 24)),
                    Math.min(image.height, (window.innerWidth * this.dpr - x - 24) / ratio))
            }

            this.imagePreview.unmount()
            this.flag = 0
        }
    }
}

export default ImageObject
