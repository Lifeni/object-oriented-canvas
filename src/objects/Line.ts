import Base from "./bases/Base"
import { objectOptionEmitter } from "../emitter"
import { lineOption, LineOption } from "../store"
import { v4 as uuidv4 } from "uuid"

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

    blur(x: number, y: number): void {
        this.active = false
        this.pushHistory<LineObjectType>({
            id: uuidv4(),
            name: "line",
            x: this.x,
            y: this.y,
            ex: x,
            ey: y,
            option: this.lineOption.option,
        })
    }

    reDraw(data: LineObjectType): void {
        this.create(data.x, data.y)
        this.lineOption.setOption(data.option)
        this.draw(data.ex, data.ey)
        this.blur(data.ex, data.ey)
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
