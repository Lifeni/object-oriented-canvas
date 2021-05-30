class Base {
    public ctx: CanvasRenderingContext2D
    public active = false
    public x: number
    public y: number

    public dpr = devicePixelRatio
    public vw = window.screen.width * this.dpr
    public vh = window.screen.height * this.dpr

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
    }

    create(x: number, y: number): void {
        this.active = true
        this.x = x
        this.y = y
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    blur(x: number, y: number): void {
        this.active = false
    }
}

export default Base
