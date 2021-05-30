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
        const h = (window.innerHeight - 48) * window.devicePixelRatio
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
export const canvasElement = new CanvasElement()

class CircleOption {
    public option: ICircleOption = {
        borderWidth: 2,
        borderColor: "#000000",
        fillColor: "#ffffff",
        noFillColor: true,
        isPerfectCircle: false,
    }

    setOption(modifiedOption: ICircleOption) {
        this.option = modifiedOption
        objectOptionEmitter.emit("circle", modifiedOption)
    }
}

export const circleOption = new CircleOption()
