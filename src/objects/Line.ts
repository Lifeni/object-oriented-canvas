import Base from "./bases/Base"
import { objectOptionEmitter } from "../emitter"
import { lineOption, LineOption } from "../store"

class Line extends Base {
    public lineOption: LineOption = lineOption

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx)
        this.applyOption()
    }

    draw(x: number, y: number): void {
        this.ctx.beginPath()
        this.ctx.moveTo(this.x, this.y)
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }

    applyOption(): void {
        const apply = (who: ILineOption): void => {
            this.ctx.lineWidth = who.lineWidth
            this.ctx.strokeStyle = who.lineColor
        }

        apply(this.lineOption.option)
        objectOptionEmitter.on("line", (event: ILineOption) => {
            apply(event)
        })
    }
}

export default Line
