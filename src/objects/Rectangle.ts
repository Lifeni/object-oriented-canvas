import Polygon from "./bases/Polygon"
import { rectangleOption } from "../store"

class Rectangle extends Polygon {

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx, rectangleOption)
    }

    draw(x: number, y: number): void {
        this.ctx.beginPath()

        if (this.polygonOption.option.isPerfectPolygon || this.pressShift) {
            this.ctx.rect(this.x, this.y,
                Math.max(x - this.x, y - this.y),
                Math.max(x - this.x, y - this.y))
        } else {
            this.ctx.rect(this.x, this.y, x - this.x, y - this.y)
        }

        this.checkOption()
    }
}

export default Rectangle
