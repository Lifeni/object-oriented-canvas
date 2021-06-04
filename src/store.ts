import { canvasEmitter, objectOptionEmitter } from "./emitter"
import Circle from "./objects/Circle"
import Rectangle from "./objects/Rectangle"
import Line from "./objects/Line"
import Text from "./objects/Text"
import Image from "./objects/Image"
import { Socket as SocketClient } from "socket.io-client"
import { v4 as uuidv4 } from "uuid"
import ObjectFrame from "./objects/widgets/ObjectFrame"

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

        if (canvasConnection.status !== "normal") {
            canvasConnection.send("add", data)
        }
    }

    undo(): void {
        if (canvasConnection.status === "normal") {
            const temp = this.history.pop()
            if (temp) {
                this.feature.push(temp)
                this.clearCanvas(canvasContext.ctx)
                this.reDraw(this.history)
                canvasFile.change()
            }
        }
    }

    redo(): void {
        if (canvasConnection.status === "normal") {
            const temp = this.feature.pop()
            if (temp) {
                this.history.push(temp)
                this.reDrawOnce(temp)
                canvasFile.change()
            }
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
        this.refresh()
    }

    change() {
        this.saved = false
        this.refresh()
    }

    clear(): void {
        this.file = null
    }

    refresh(): void {
        canvasEmitter.emit("property-bar", { current: "self" })
    }
}

export const canvasFile = new CanvasFile()

class CanvasConnection {
    public status: ConnectionStatusType = "normal"
    public path = ""
    public socket: SocketClient
    public id: string

    setSocket(socket: SocketClient): void {
        this.socket = socket
    }

    host(path: string): void {
        this.status = "hosted"
        this.path = path

        this.refresh()
        this.listener()
    }

    connect(path: string): void {
        this.status = "connected"
        this.path = path
        this.id = uuidv4()

        this.refresh()
        this.listener()
    }

    send(action: ConnectionActionType, data?: CanvasHistoryType | Array<CanvasHistoryType>): void {
        this.socket.emit("send", {
            from: this.id,
            action: action,
            data: data || {}
        })
    }

    listener(): void {
        this.socket.on("broadcast", (res) => {
            if (res.from !== this.id) {
                switch (res.action) {
                    case "add": {
                        // canvasHistory.push(res.data)
                        canvasHistory.reDrawOnce(res.data)
                        break
                    }
                    case "clear": {
                        canvasHistory.clearCanvas(canvasContext.ctx)
                        break
                    }
                    case "open": {
                        canvasHistory.clear()
                        canvasHistory.clearCanvas(canvasContext.ctx)
                        canvasHistory.set(res.data)
                        canvasHistory.reDraw(res.data)
                        break
                    }
                    default: {
                        break
                    }
                }
            }
        })
    }

    close(): void {
        this.status = "normal"
        this.path = ""
        this.id = ""

        this.refresh()
    }

    refresh(): void {
        canvasEmitter.emit("property-bar", { current: "self" })
    }
}

export const canvasConnection = new CanvasConnection()

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

export const objectFrame = new ObjectFrame()
