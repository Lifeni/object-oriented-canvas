import { canvasEmitter, objectOptionEmitter } from "./emitter"
import Circle from "./objects/Circle"
import Rectangle from "./objects/Rectangle"
import Line from "./objects/Line"
import Text from "./objects/Text"
import Image from "./objects/Image"

class CanvasContext {
    public ctx: CanvasRenderingContext2D

    set(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
    }
}

export const canvasContext = new CanvasContext()

class CanvasHistory {
    public history: Array<CanvasHistoryType> = []
    public feature: Array<CanvasHistoryType> = []

    push<T extends CanvasHistoryType>(data: T) {
        this.history.push(data)
        this.feature = []

        canvasFile.change()
    }

    undo(): void {
        const temp = this.history.pop()
        if (temp) {
            this.feature.push(temp)
            this.clearCanvas(canvasContext.ctx)
            this.reDraw(this.history)
            canvasFile.change()
        }
    }

    redo(): void {
        const temp = this.feature.pop()
        if (temp) {
            this.history.push(temp)
            this.reDrawOnce(temp)
            canvasFile.change()
        }
    }

    set(file: Array<CanvasHistoryType>): void {
        this.history = file
    }

    clear(): void {
        this.history = []
        this.feature = []
    }

    reDrawOnce(atom: CanvasHistoryType): void {
        const ctx = canvasContext.ctx

        switch (atom.name) {
            case "circle": {
                const circle = new Circle(ctx)
                circle.reDraw(atom as CircleObjectType)
                break
            }
            case "rectangle": {
                const rectangle = new Rectangle(ctx)
                rectangle.reDraw(atom as RectangleObjectType)
                break
            }
            case "line": {
                const line = new Line(ctx)
                line.reDraw(atom as LineObjectType)
                break
            }
            case "text": {
                const text = new Text(ctx, atom.id)
                text.reDraw(atom as TextObjectType)
                break
            }
            case "image": {
                const image = new Image(ctx, atom.id)
                image.reDraw(atom as ImageObjectType)
                break
            }
            default: {
                break
            }
        }
    }

    reDraw(data: Array<CanvasHistoryType>): void {
        data.forEach((atom) => {
            this.reDrawOnce(atom)
        })
    }

    clearCanvas(ctx: CanvasRenderingContext2D): void {
        ctx.save()
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = "#fff"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.restore()
    }
}

export const canvasHistory = new CanvasHistory()

class CanvasFile {
    public file: string | null = null
    public saved = false

    set(path: string) {
        this.file = path
    }

    save() {
        this.saved = true
        canvasEmitter.emit("property-bar", { current: "self" })
    }

    change() {
        this.saved = false
        canvasEmitter.emit("property-bar", { current: "self" })
    }

    clear(): void {
        this.file = null
    }
}

export const canvasFile = new CanvasFile()

class CanvasTool {
    public tool = "cursor"

    setTool(tool: string): void {
        this.tool = tool
    }

    setDefault() {
        this.tool = "cursor"
    }
}

class CanvasSnapshot {
    public snapshot: ImageData

    set(data: ImageData): void {
        this.snapshot = data
    }

    get(): ImageData {
        return this.snapshot
    }

    clear(): void {
        this.snapshot = null
    }
}

class CanvasElement {
    public canvas: HTMLCanvasElement

    get(): HTMLCanvasElement {
        return this.canvas
    }

    set(element: HTMLCanvasElement) {
        this.canvas = element
    }

    exportFile(type: string): string {
        const w = window.innerWidth * window.devicePixelRatio
        const h = (window.innerHeight - canvasElement.get().getBoundingClientRect().y) * window.devicePixelRatio
        const canvas = document.createElement("canvas")
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext("2d")
        ctx.putImageData(this.canvas.getContext("2d").getImageData(0, 0, w, h), 0, 0)
        return canvas.toDataURL(type)
    }
}

export const canvasTool = new CanvasTool()

export const canvasSnapshot = new CanvasSnapshot()

export const canvasElement = new CanvasElement()

export class ShapeOption {
    public option: IShapeOption = {
        borderWidth: 2,
        borderColor: "#000000",
        fillColor: "#ffffff",
        noFillColor: true,
        isPerfectShape: false,
    }

    setOption(modifiedOption: IShapeOption): void {
        this.option = modifiedOption
        objectOptionEmitter.emit("shape", modifiedOption)
    }
}

export const circleOption = new ShapeOption()

export const rectangleOption = new ShapeOption()

export class LineOption {
    public option: ILineOption = {
        lineWidth: 2,
        lineColor: "#000000",
    }

    setOption(modifiedOption: ILineOption): void {
        this.option = modifiedOption
        objectOptionEmitter.emit("line", modifiedOption)
    }
}

export const lineOption = new LineOption()

export class TextOption {
    public option: ITextOption = {
        fontSize: 18,
        fontFamily: "Inter",
        fontColor: "#000000",
        isBold: false,
        isItalic: false
    }

    setOption(modifiedOption: ITextOption): void {
        this.option = modifiedOption
        objectOptionEmitter.emit("text", modifiedOption)
    }
}

export const textOption = new TextOption()
