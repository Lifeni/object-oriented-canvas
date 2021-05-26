import Base from "./Base"

class Circle extends Base {

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx)
    }

    draw(x: number, y: number): void {
        this.ctx.beginPath()
        this.ctx.arc(this.x - (this.x - x) / 2, this.y - (this.y - y) / 2,
            this.calc(this.x - x, this.y - y), 0, 2 * Math.PI)
        this.ctx.stroke()
    }

    calc(dx: number, dy: number): number {
        return Math.sqrt(Math.pow(Math.abs(dx) / 2, 2) + Math.pow(Math.abs(dy) / 2, 2))
    }
}

export default Circle
