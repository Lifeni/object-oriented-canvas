import Base from "./Base"

class Rectangle extends Base {
    public active = false
    public x: number
    public y: number

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
        this.ctx.rect(this.x, this.y, -(this.x - x), -(this.y - y))
        this.ctx.stroke()
    }

    blur(): void {
        this.active = false
    }
}

export default Rectangle
