import Vector from "./Vector"
import { objectOptionEmitter } from "../../emitter"
import { fromEvent } from "rxjs"
import { pluck } from "rxjs/operators"
import { PolygonOption } from "../../store"

class Polygon extends Vector {
    public pressShift = false
    public polygonOption: PolygonOption

    constructor(ctx: CanvasRenderingContext2D, store: PolygonOption) {
        super(ctx)
        this.polygonOption = store
        this.applyOption()
        this.bindKey()
    }

    applyOption(): void {
        const apply = (who: IPolygonOption): void => {
            this.ctx.lineWidth = who.borderWidth
            this.ctx.strokeStyle = who.borderColor
            this.ctx.fillStyle = who.fillColor || "#ffffff"
        }

        apply(this.polygonOption.option)
        objectOptionEmitter.on("polygon", (event: IPolygonOption) => {
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
        if (!this.polygonOption.option.noFillColor) {
            this.ctx.fill()
        }

        if (this.polygonOption.option.borderWidth !== 0) {
            this.ctx.stroke()
        }
    }
}

export default Polygon
