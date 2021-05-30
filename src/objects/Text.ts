import Base from "./bases/Base"

class Text extends Base {

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx)
    }

    create(x: number, y: number): void {
        this.active = true
        this.x = x
        this.y = y

    }

    draw(x: number, y: number): void {
        this.ctx.beginPath()
        this.ctx.moveTo(this.x, this.y)
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }
}

export default Text
