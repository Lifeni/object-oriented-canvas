import { textOption, TextOption } from "../store"
import TextInput from "./widgets/TextInput"
import { textInputEmitter } from "../emitter"
import Base from "./bases/Base"
import { v4 as uuidv4 } from "uuid"

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

    // 绘制预选框
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

    // 绘制结束时插入一个文本框用于输入
    blur(x: number, y: number): void {
        if (!this.active) return

        this.active = false
        this.getCanvas()

        const minX = Math.min(this.x, x)
        const minY = Math.min(this.y, y)
        const dx = Math.abs(this.x - x)
        const dy = Math.abs(this.y - y)

        if (dx < 120 || dy < 40) return

        const textInput = new TextInput(minX, minY, dx, dy, this.id)
        textInput.mount()

        // 监听输入完成事件
        textInputEmitter.on("ok", ({ value, id }) => {
            if (this.id === id) {
                this.drawText(dx, value)
                this.pushHistory<TextObjectType>({
                    id: uuidv4(),
                    name: "text",
                    x: this.x,
                    y: this.y,
                    ex: x,
                    ey: y,
                    option: this.textOption.option,
                    data: value
                })

                textInput.unmount()
            }
        })

        // 监听输入取消事件
        textInputEmitter.on("cancel", ({ id }) => {
            if (this.id === id) {
                textInput.unmount()
            }
        })

        this.setCanvas()
    }

    // 绘制文字
    drawText(dx: number, value: string): void {
        // 确定绘制文字的样式
        this.ctx.font =
            `${this.textOption.option.isBold ? `bold` : ``} ${this.textOption.option.isItalic ? `italic` : ``} ${this.textOption.option.fontSize * window.devicePixelRatio}px ${this.textOption.option.fontFamily}`
        this.ctx.fillStyle = this.textOption.option.fontColor

        // 自动换行绘制文本
        // Polyfill 来自 https://www.zhangxinxu.com/wordpress/2018/02/canvas-text-break-line-letter-spacing-vertical/
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.ctx.wrapText(value, this.x + 18, this.y + this.textOption.option.fontSize * window.devicePixelRatio + 14,
            dx - 40, this.textOption.option.fontSize * window.devicePixelRatio * 1.5)
    }

    reDraw(data: TextObjectType): void {
        this.textOption.setOption(data.option)
        this.x = data.x
        this.y = data.y

        this.drawText(Math.abs(data.x - data.ex), data.data)
    }
}

export default Text
