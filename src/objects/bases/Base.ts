import { canvasHistory, canvasSnapshot } from "../../store"

class Base {
    public ctx: CanvasRenderingContext2D

    public dpr = devicePixelRatio
    public vw = window.screen.width * this.dpr
    public vh = window.screen.height * this.dpr

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

    blur(x: number, y: number): void {
        this.active = false
    }

    setCanvas(): void {
        canvasSnapshot.set(this.ctx.getImageData(0, 0, this.vw, this.vh))
    }

    getCanvas(): void {
        this.ctx.putImageData(canvasSnapshot.get(), 0, 0)
    }

    pushHistory<T extends CanvasHistoryType>(object: T): void {
        canvasHistory.push<T>(object)
    }
}

export default Base
