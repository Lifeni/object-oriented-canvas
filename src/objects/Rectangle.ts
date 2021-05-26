import Base from "./Base"

class Rectangle extends Base {

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx)
    }

    draw(x: number, y: number): void {
        this.ctx.beginPath()
        this.ctx.rect(this.x, this.y, -(this.x - x), -(this.y - y))
        this.ctx.stroke()
    }
}

export default Rectangle
