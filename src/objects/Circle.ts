import Base from "./Base"

class Circle extends Base {

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx)
    }

    create(x: number, y: number, width: number): void {
        this.ctx.beginPath()
        this.ctx.arc(x, y, width, 0, 2 * Math.PI)
        this.ctx.stroke()
    }
}

export default Circle
