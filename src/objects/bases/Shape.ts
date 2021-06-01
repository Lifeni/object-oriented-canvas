import Base from "./Base"
import { objectOptionEmitter } from "../../emitter"
import { fromEvent } from "rxjs"
import { pluck } from "rxjs/operators"
import { ShapeOption } from "../../store"

class Shape extends Base {
    public pressShift = false
    public shapeOption: ShapeOption

    constructor(ctx: CanvasRenderingContext2D, store: ShapeOption) {
        super(ctx)
        this.shapeOption = store
        this.applyOption()
        this.bindKey()
    }

    applyOption(): void {
        const apply = (who: IShapeOption): void => {
            this.ctx.lineWidth = who.borderWidth
            this.ctx.strokeStyle = who.borderColor
            this.ctx.fillStyle = who.fillColor || "#ffffff"
        }

        apply(this.shapeOption.option)
        objectOptionEmitter.on("shape", (event: IShapeOption) => {
            apply(event)
        })
    }

    bindKey(): void {
        fromEvent(window, "keydown")
            .pipe(
                pluck("shiftKey"),
            )
            .subscribe(() => this.pressShift = true)

        fromEvent(window, "keyup")
            .subscribe(() => this.pressShift = false)
    }

    checkOption(): void {
        if (!this.shapeOption.option.noFillColor) {
            this.ctx.fill()
        }

        if (this.shapeOption.option.borderWidth !== 0) {
            this.ctx.stroke()
        }
    }
}

export default Shape
