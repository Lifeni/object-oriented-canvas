import Base from "./bases/Base"

class Line extends Base {

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx)
    }

    draw(x: number, y: number): void {
        this.ctx.beginPath()
        this.ctx.moveTo(this.x, this.y)
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }
}

export default Line
