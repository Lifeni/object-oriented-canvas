import Base from "./Base"
import { objectOptionEmitter } from "../../emitter"
import { ShapeOption } from "../../store"
import Mousetrap from "mousetrap"

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
        Mousetrap.bind("shift", () => {
            this.pressShift = true
        }, "keydown")

        Mousetrap.bind("shift", () => {
            this.pressShift = false
        }, "keyup")
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
