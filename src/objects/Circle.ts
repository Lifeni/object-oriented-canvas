import Base from "./Base"
import { circleOption } from "../store"
import { objectOptionEmitter } from "../emitter"

class Circle extends Base {
    public option = circleOption

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx)
        this.applyOption()
    }

    draw(x: number, y: number): void {
        this.ctx.save()
        this.ctx.beginPath()

        if (this.option.option.isPerfectCircle) {
            this.ctx.arc(this.x - (this.x - x) / 2, this.y - (this.y - y) / 2,
                this.calc(this.x - x, this.y - y), 0, 2 * Math.PI)
        } else {
            this.ctx.ellipse(this.x - (this.x - x) / 2, this.y - (this.y - y) / 2,
                this.calcRatio(this.x - x, this.y - y) * Math.abs(x - this.x) / 2,
                this.calcRatio(this.x - x, this.y - y) * Math.abs(y - this.y) / 2,
                Math.PI * (Math.atan((this.y - y) / (this.x - x))) / 180, 0, 2 * Math.PI)
        }

        if (this.option.option.borderWidth !== 0) {
            console.log(this.option.option.borderWidth, typeof this.option.option.borderWidth)
            this.ctx.stroke()
        }

        if (!this.option.option.noFillColor) {
            this.ctx.fill()
        }

        this.ctx.restore()
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

    applyOption(): void {
        const apply = (who: ICircleOption): void => {
            this.ctx.lineWidth = who.borderWidth
            this.ctx.strokeStyle = who.borderColor
            this.ctx.fillStyle = who.fillColor || "#ffffff"
        }

        apply(this.option.option)
        objectOptionEmitter.on("circle", (event: ICircleOption) => {
            apply(event)
        })
    }
}

export default Circle
