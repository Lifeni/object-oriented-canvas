import Shape from "./bases/Shape"
import { rectangleOption } from "../store"
import { v4 as uuidv4 } from "uuid"

class Rectangle extends Shape {

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx, rectangleOption)
    }

    draw(x: number, y: number): void {
        const dx = Math.abs(this.x - x)
        const dy = Math.abs(this.y - y)
        if (dx < 1 && dy < 1) return

        this.ctx.beginPath()

        // 判断是否是正方形
        if (this.shapeOption.option.isPerfectShape || this.pressShift) {
            this.ctx.rect(this.x, this.y,
                Math.max(x - this.x, y - this.y),
                Math.max(x - this.x, y - this.y))
        } else {
            this.ctx.rect(this.x, this.y, x - this.x, y - this.y)
        }

        this.checkOption()
    }

    blur(x: number, y: number): void {
        this.active = false

        const dx = Math.abs(this.x - x)
        const dy = Math.abs(this.y - y)
        if (dx < 1 && dy < 1) return

        this.pushHistory<RectangleObjectType>({
            id: uuidv4(),
            name: "rectangle",
            x: this.x,
            y: this.y,
            ex: x,
            ey: y,
            option: {
                ...this.shapeOption.option,
                isPerfectShape: (this.shapeOption.option.isPerfectShape || this.pressShift)
            },
        })
    }

    reDraw(data: RectangleObjectType): void {
        this.create(data.x, data.y)
        this.shapeOption.setOption(data.option)
        this.draw(data.ex, data.ey)

        this.active = false
    }
}

export default Rectangle
