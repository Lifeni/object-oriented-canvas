class Base {
    public ctx: CanvasRenderingContext2D

    public dpr = devicePixelRatio
    public vw = window.screen.width * this.dpr
    public vh = window.screen.height * this.dpr

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
    }
}

export default Base
