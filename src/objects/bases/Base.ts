class Base {
    public ctx: CanvasRenderingContext2D
    public active = false
    public x: number
    public y: number

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
    }

    create(x: number, y: number): void {
        this.active = true
        this.x = x
        this.y = y
    }

    blur(): void {
        this.active = false
    }
}

export default Base
