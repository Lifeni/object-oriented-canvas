import Base from "./bases/Base"
import { canvasTextHistory, textOption, TextOption } from "../store"
import TextInput from "./widgets/TextInput"
import { textInputEmitter } from "../emitter"

class Text extends Base {
    public textOption: TextOption = textOption
    private readonly id: string

    constructor(ctx: CanvasRenderingContext2D, id: string) {
        super(ctx)
        this.id = id
    }

    create(x: number, y: number): void {
        this.active = true
        this.x = x
        this.y = y

        this.setCanvas()
    }

    draw(x: number, y: number): void {
        if (this.active) {
            this.ctx.save()
            this.ctx.beginPath()

            this.ctx.setLineDash([8, 8])
            this.ctx.strokeStyle = "#e0e0e0"
            this.ctx.lineWidth = 2
            this.ctx.rect(this.x, this.y, x - this.x, y - this.y)
            this.ctx.stroke()

            this.ctx.restore()
        }
    }

    blur(x: number, y: number): void {

        if (!this.active) return

        this.active = false

        const minX = Math.min(this.x, x)
        const minY = Math.min(this.y, y)
        const dx = Math.abs(this.x - x)
        const dy = Math.abs(this.y - y)

        if (dx < 120 || dy < 40) return

        this.getCanvas()

        const textInput = new TextInput(minX, minY, dx, dy, this.id)
        textInput.mount()

        textInputEmitter.on("ok", ({ value, id }) => {
            if (this.id === id) {
                this.ctx.font =
                    `${this.textOption.option.isBold ? `bold` : ``} ${this.textOption.option.isItalic ? `italic` : ``} ${this.textOption.option.fontSize * window.devicePixelRatio}px ${this.textOption.option.fontFamily}`
                this.ctx.fillStyle = this.textOption.option.fontColor
                this.ctx.fillText(value, this.x + 18, this.y + this.textOption.option.fontSize * window.devicePixelRatio + 14)

                textInput.unmount()
            }
        })

        textInputEmitter.on("cancel", ({ id }) => {
            if (this.id === id) {
                textInput.unmount()
            }
        })

        this.setCanvas()
    }

    setCanvas(): void {
        canvasTextHistory.set(this.ctx.getImageData(0, 0, this.vw, this.vh))
    }

    getCanvas(): void {
        this.ctx.putImageData(canvasTextHistory.get(), 0, 0)
    }
}

export default Text
