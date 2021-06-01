import ImagePreview from "./widgets/ImagePreview"
import Base from "./bases/Base"
import { v4 as uuidv4 } from "uuid"

class ImageObject extends Base {
    public imagePreview: ImagePreview
    public imageData: IImportImageData

    public image = new Image()

    public flag = 0
    private readonly id: string

    constructor(ctx: CanvasRenderingContext2D, id: string, data?: IImportImageData) {
        super(ctx)

        if (data) {
            this.imageData = data
            this.imagePreview = new ImagePreview(id, data)
            this.imagePreview.mount()

            this.image.src = `data:image/png;base64,${this.imageData.data}`
        }

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

        if (dx < 100 && dy < 100) {
            this.imagePreview.show()
        } else {
            this.imagePreview.hide()
        }

        const imageRatio = this.image.width / this.image.height
        const containerRatio = dx / dy

        if (imageRatio > containerRatio) {
            const mX = (this.x > x) ? (this.x - dy * imageRatio) : this.x
            const mY = (this.y > y) ? (this.y - dy) : this.y

            this.ctx.drawImage(this.image, mX, mY, dy * imageRatio, dy)
        } else {
            const mX = (this.x > x) ? (this.x - dx) : this.x
            const mY = (this.y > y) ? (this.y - dx / imageRatio) : this.y

            this.ctx.drawImage(this.image, mX, mY, dx, dx / imageRatio)
        }
    }


    blur(x: number, y: number): void {
        if (!this.active) return

        this.active = false
        this.drawImage(x, y)
        this.imagePreview.unmount()

        const dx = Math.abs(x - this.x)
        const dy = Math.abs(y - this.y)
        const imageRatio = this.image.width / this.image.height
        const containerRatio = dx / dy

        let mX, mY

        if (imageRatio > containerRatio) {
            mX = (this.x > x) ? (this.x - dy * imageRatio) : this.x
            mY = (this.y > y) ? (this.y - dy) : this.y
        } else {
            mX = (this.x > x) ? (this.x - dx) : this.x
            mY = (this.y > y) ? (this.y - dx / imageRatio) : this.y
        }

        this.pushHistory<ImageObjectType>({
            id: uuidv4(),
            name: "image",
            x: mX,
            y: mY,
            ex: imageRatio > containerRatio ? dy * imageRatio : dx,
            ey: imageRatio > containerRatio ? dy : dx / imageRatio,
            data: this.imageData.data
        })
    }

    reDraw(data: ImageObjectType): void {
        const image = new Image()
        image.src = `data:image/png;base64,${data.data}`
        image.onload = () => {
            this.ctx.drawImage(image, data.x, data.y, data.ex, data.ey)
        }
    }
}

export default ImageObject
