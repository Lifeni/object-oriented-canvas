import { objectOptionEmitter } from "./emitter"

class CanvasToolStore {
    public tool = "cursor"

    setTool(tool: string): void {
        this.tool = tool
    }

    setDefault() {
        this.tool = "cursor"
    }
}

class CanvasHistoryStore {
    public history: ImageData

    set(data: ImageData): void {
        this.history = data
    }

    get(): ImageData {
        return this.history
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

export const canvasTool = new CanvasToolStore()
export const canvasHistory = new CanvasHistoryStore()
export const canvasTextHistory = new CanvasHistoryStore()
export const canvasElement = new CanvasElement()

export class PolygonOption {
    public option: IPolygonOption = {
        borderWidth: 2,
        borderColor: "#000000",
        fillColor: "#ffffff",
        noFillColor: true,
        isPerfectPolygon: false,
    }

    setOption(modifiedOption: IPolygonOption): void {
        this.option = modifiedOption
        objectOptionEmitter.emit("polygon", modifiedOption)
    }
}

export const circleOption = new PolygonOption()
export const rectangleOption = new PolygonOption()

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
