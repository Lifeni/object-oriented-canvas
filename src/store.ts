import { canvasEmitter, objectOptionEmitter } from "./emitter"
import Circle from "./objects/Circle"
import Rectangle from "./objects/Rectangle"
import Line from "./objects/Line"
import Text from "./objects/Text"
import Image from "./objects/Image"
import { Socket as SocketClient } from "socket.io-client"
import { v4 as uuidv4 } from "uuid"

class CanvasContext {
    public ctx: CanvasRenderingContext2D

    set(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
    }
}

export const canvasContext = new CanvasContext()

class CanvasHistory {
    // 历史绘图数据
    public history: Array<CanvasHistoryType> = []
    // 保存已经撤销的数据
    public feature: Array<CanvasHistoryType> = []

    // 绘图操作后，存入历史
    push<T extends CanvasHistoryType>(data: T) {
        this.history.push(data)
        this.feature = []

        // 表明画板已经发生改变
        canvasFile.change()

        // 如果开启了局域网连接，则发送改动到其他客户端
        if (canvasConnection.status !== "normal") {
            canvasConnection.send("add", data)
        }
    }

    // 撤销
    undo(): void {
        // 撤销操作仅在非局域网连接下启用
        if (canvasConnection.status === "normal") {
            const temp = this.history.pop()
            if (temp) {
                this.feature.push(temp)

                // 撤销后重绘画板
                this.clearCanvas(canvasContext.ctx)
                this.reDraw(this.history)
                canvasFile.change()
            }
        }
    }

    // 重做
    redo(): void {
        // 重做操作仅在非局域网连接下启用
        if (canvasConnection.status === "normal") {
            const temp = this.feature.pop()
            if (temp) {
                this.history.push(temp)

                // 重做后只需重绘重做的数据即可
                this.reDrawOnce(temp)
                canvasFile.change()
            }
        }
    }

    // 整个替换历史记录，用在读入文件时
    set(file: Array<CanvasHistoryType>): void {
        this.history = file
    }

    // 清空历史记录和撤销记录
    clear(): void {
        this.history = []
        this.feature = []
    }

    // 重绘一次
    reDrawOnce(atom: CanvasHistoryType): void {
        // 获得当前 Canvas 的 ctx
        const ctx = canvasContext.ctx

        // 根据数据类型进行重绘
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

    // 重绘历史记录中的所有数据
    reDraw(data: Array<CanvasHistoryType>): void {
        data.forEach((atom) => {
            this.reDrawOnce(atom)
        })
    }

    // 清空画布，不清空历史记录
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
        // 发送当前绘图操作的数据
        this.socket.emit("send", {
            from: this.id,
            action: action,
            data: data || {}
        })
    }

    listener(): void {
        // 接收广播数据
        this.socket.on("broadcast", (res) => {
            // 如果当前的操作不是自己发送的
            if (res.from !== this.id) {
                switch (res.action) {
                    case "add": {
                        // 因为是添加图形，所以只绘制单个数据
                        canvasHistory.reDrawOnce(res.data)
                        break
                    }
                    case "clear": {
                        // 清空画板
                        canvasHistory.clearCanvas(canvasContext.ctx)
                        break
                    }
                    case "open": {
                        // 打开文件时，需要先清空画板，再绘制所有数据
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

