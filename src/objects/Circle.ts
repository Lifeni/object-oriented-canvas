import Shape from "./bases/Shape"
import { circleOption } from "../store"
import { v4 as uuidv4 } from "uuid"

class Circle extends Shape {
    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx, circleOption)
    }

    draw(x: number, y: number): void {
        this.ctx.beginPath()

        if (this.shapeOption.option.isPerfectShape || this.pressShift) {
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

    blur(x: number, y: number): void {
        this.active = false
        this.pushHistory<CircleObjectType>({
            id: uuidv4(),
            name: "circle",
            x: this.x,
            y: this.y,
            ex: x,
            ey: y,
            option: this.shapeOption.option,
        })
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

    reDraw(data: CircleObjectType): void {
        this.create(data.x, data.y)
        this.shapeOption.setOption(data.option)
        this.draw(data.ex, data.ey)
        this.blur(data.ex, data.ey)
    }
}

export default Circle
