import Base from "./Base"

class Line extends Base {

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx)
    }

    create(x1: number, y1: number, x2: number, y2: number): void {
        this.ctx.beginPath()
        this.ctx.moveTo(x1, y1)
        this.ctx.lineTo(x2, y2)
        this.ctx.stroke()
    }
}

export default Line
