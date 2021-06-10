import Shape from "./bases/Shape"
import { circleOption } from "../store"
import { v4 as uuidv4 } from "uuid"

class Circle extends Shape {
    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx, circleOption)
    }

    draw(x: number, y: number): void {
        const dx = Math.abs(this.x - x)
        const dy = Math.abs(this.y - y)
        if (dx < 1 && dy < 1) return

        this.ctx.beginPath()

        if (this.shapeOption.option.isPerfectShape || this.pressShift) {
            const dx = Math.abs(this.x - x)
            const dy = Math.abs(this.y - y)
            const d = Math.min(dx, dy)
            this.ctx.arc((this.x + x) / 2, (this.y + y) / 2, d / 2, 0, 2 * Math.PI)
        } else {
            const dx = Math.abs(this.x - x)
            const dy = Math.abs(this.y - y)
            this.ctx.ellipse((this.x + x) / 2, (this.y + y) / 2, dx / 2, dy / 2,
                Math.PI * (Math.atan((this.y - y) / (this.x - x))) / 180, 0, 2 * Math.PI)
        }

        this.checkOption()
    }

    blur(x: number, y: number): void {
        this.active = false

        const dx = Math.abs(this.x - x)
        const dy = Math.abs(this.y - y)
        if (dx < 1 && dy < 1) return

        this.pushHistory<CircleObjectType>({
            id: uuidv4(),
            name: "circle",
            x: this.x,
            y: this.y,
            ex: x,
            ey: y,
            option: {
                ...this.shapeOption.option,
                isPerfectShape: (this.shapeOption.option.isPerfectShape || this.pressShift)
            },
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

        this.active = false
    }
}

export default Circle
