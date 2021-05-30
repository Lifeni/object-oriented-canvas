import Polygon from "./bases/Polygon"
import { circleOption } from "../store"

class Circle extends Polygon {
    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx, circleOption)
    }

    draw(x: number, y: number): void {
        this.ctx.beginPath()

        if (this.polygonOption.option.isPerfectPolygon || this.pressShift) {
            this.ctx.arc(this.x - (this.x - x) / 2, this.y - (this.y - y) / 2,
                this.calc(this.x - x, this.y - y), 0, 2 * Math.PI)
        } else {
            this.ctx.ellipse(this.x - (this.x - x) / 2, this.y - (this.y - y) / 2,
                this.calcRatio(this.x - x, this.y - y) * Math.abs(x - this.x) / 2,
                this.calcRatio(this.x - x, this.y - y) * Math.abs(y - this.y) / 2,
                Math.PI * (Math.atan((this.y - y) / (this.x - x))) / 180, 0, 2 * Math.PI)
        }

        this.checkOption()
    }

    calc(dx: number, dy: number): number {
        return Math.sqrt(Math.pow((Math.abs(dx) / 2), 2) + Math.pow((Math.abs(dy) / 2), 2))
    }

    calcRatio(dx: number, dy: number): number {
        const pow2 = (n: number) => Math.pow(n, 2)
        const sqrt2 = (n: number) => Math.sqrt(n)

        const x = dx * dy / (sqrt2(pow2(dy) + pow2(dx) * pow2(dy / dx)))
        const y = dx * dy * (dy / dx) / (sqrt2(pow2(dy) + pow2(dx) * pow2(dy / dx)))

        return this.calc(dx, dy) / this.calc(x, y)
    }

}

export default Circle
