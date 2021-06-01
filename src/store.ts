import { objectOptionEmitter } from "./emitter"
import { ipcRenderer } from "electron"

class CanvasContext {
    public ctx: CanvasRenderingContext2D

    set(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
    }
}

export const canvasContext = new CanvasContext()

class CanvasHistory {
    public history: Array<CanvasHistoryType> = []

    push<T extends CanvasHistoryType>(data: T) {
        this.history.push(data)
    }

    save(): void {
        ipcRenderer.send("save-file", {
            type: "save",
            data: this.history
        })
    }

    saveAs(): void {
        ipcRenderer.send("save-file", {
            type: "save-as",
            data: this.history
        })
    }

    reDraw(data: Array<CanvasHistoryType>): void {
        const ctx = canvasContext.ctx

        this.history = []
        this.clear(ctx)

        console.log(data)

        data.forEach((atom) => {
            switch (atom.name) {
                case "circle": {
                    break
                }
                default: {
                    break
                }
            }
        })
    }

    clear(ctx: CanvasRenderingContext2D): void {
        ctx.save()
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = "#fff"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.restore()
    }
}

export const canvasHistory = new CanvasHistory()

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
