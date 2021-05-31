import ImagePreview from "./widgets/ImagePreview"
import Base from "./bases/Base"

class ImageObject extends Base {
    public imagePreview: ImagePreview
    public imageData: IImportImageData

    public image = new Image()

    public flag = 0
    private readonly id: string

    constructor(ctx: CanvasRenderingContext2D, id: string, data: IImportImageData) {
        super(ctx)

        this.imageData = data
        this.imagePreview = new ImagePreview(id, data)
        this.imagePreview.mount()

        this.image.src = `data:image/png;base64,${this.imageData.data}`

        this.flag = 1
        this.id = id
    }

    follow(x: number, y: number): void {
        this.imagePreview.move(x + 24, y)
    }

    create(x: number, y: number): void {
        this.active = true
        this.x = x
        this.y = y
    }

    draw(x: number, y: number): void {
        this.drawImage(x, y)
    }

    drawImage(x: number, y: number): void {
        if (!this.active) return

        const dx = Math.abs(x - this.x)
        const dy = Math.abs(y - this.y)

        if (dx < 4 && dy < 4) return

        if (dx < 100 || dy < 100) {
            this.imagePreview.show()
        } else {
            this.imagePreview.hide()
        }

        const imageRatio = this.image.width / this.image.height
        const containerRatio = dx / dy

        if (imageRatio > containerRatio) {
            this.ctx.drawImage(this.image, this.x, this.y, dy * imageRatio, dy)
        } else {
            this.ctx.drawImage(this.image, this.x, this.y, dx, dx / imageRatio)
        }
    }

    blur(x: number, y: number): void {
        if (!this.active) return
        this.active = false
        this.drawImage(x, y)
        this.imagePreview.unmount()
    }
}

export default ImageObject
