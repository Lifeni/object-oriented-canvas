import { fromEvent } from "rxjs"
import { canvasEmitter, objectOptionEmitter } from "../../emitter"
import {
    canvasConnection,
    canvasContext,
    canvasElement,
    canvasFile,
    canvasHistory,
    canvasSnapshot,
    canvasTool,
} from "../../store"
import { CanvasObjects, objectsMap } from "../../utils/objects-map"
import Text from "../../objects/Text"
import { ipcRenderer } from "electron"
import ImageObject from "../../objects/Image"
import { v4 as uuidv4 } from "uuid"

export default class MainCanvas extends HTMLElement {

    public canvas: HTMLCanvasElement
    public ctx: CanvasRenderingContext2D

    public dpr = devicePixelRatio
    public vw = window.screen.width * this.dpr
    public vh = window.screen.height * this.dpr

    public obj: CanvasObjects
    public type: "vector" | "binary" = "vector"

    public flag = 0

    readonly stylesheet = `
        <style>
            canvas {
                width: ${window.screen.width}px;
                height: ${window.screen.height}px;
            }
        </style>
    `

    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <canvas id="canvas" class="canvas">这是一块画布</canvas>
            ${this.stylesheet}
        `

        this.canvas = <HTMLCanvasElement>shadowRoot.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")

        this.initCanvas()
        this.handleEvent()
    }

    initCanvas(): void {
        canvasContext.set(this.ctx)

        this.ctx.canvas.width = this.vw
        this.ctx.canvas.height = this.vh

        this.ctx.save()
        this.ctx.fillStyle = "#fff"
        this.ctx.fillRect(0, 0, this.vw, this.vh)
        this.ctx.restore()

        this.setCanvas()
        canvasElement.set(this.canvas)
    }

    handleEvent(): void {
        canvasEmitter.on("canvas-tool", event => {
            if (event.current === "clear") {
                this.clearCanvas()
            } else if (event.current === "image") {
                const uuid = uuidv4()

                ipcRenderer.send("import-image", uuid)
                ipcRenderer.once("import-image-data", (_, data: IImportImageData) => {
                    if (uuid === data.id) {
                        this.obj = objectsMap("image", this.ctx, data)
                        this.type = "binary"
                    }
                })
                canvasTool.setDefault()
            } else {
                canvasTool.setTool(event.current)
                this.obj = objectsMap(event.current, this.ctx)
                this.type = "vector"
            }
        })

        // 鼠标按下事件
        fromEvent(this.canvas, "mousedown")
            .subscribe((event: MouseEvent) => {
                event.preventDefault()
                const target = event.target as HTMLElement

                // 如果当前选择了一个绘图元素
                if (this.obj
                    && (target.localName === "main-canvas" || target.localName === "canvas")) {

                    // 创建对象
                    this.obj.create(event.offsetX * this.dpr, event.offsetY * this.dpr)

                    // 取消工具栏选项的焦点
                    objectOptionEmitter.emit("blur")

                    // 保存画板快照
                    this.setCanvas()

                    // 表明当前鼠标已按下
                    this.flag = 1
                }
            })

        // 鼠标移动事件
        fromEvent(this.canvas, "mousemove")
            .subscribe((event: MouseEvent) => {
                event.preventDefault()

                // 限制绘制速度为屏幕帧率
                window.requestAnimationFrame(() => {
                    const target = event.target as HTMLElement

                    // 如果当前选择了一个绘图元素，而且此元素处于活跃状态（已创建，未绘制结束）
                    if (this.obj && this.obj.active
                        && (target.localName === "main-canvas" || target.localName === "canvas")) {

                        // 恢复快照，执行绘制
                        this.getCanvas()
                        this.obj.draw(event.offsetX * this.dpr, event.offsetY * this.dpr)
                    }

                    // 如果是图像元素
                    if (this.obj && this.obj instanceof ImageObject) {
                        // 显示并跟随一个预览窗口
                        this.obj.follow(event.offsetX * this.dpr, event.offsetY * this.dpr)
                    }
                })

            })

        // 鼠标抬起事件
        fromEvent(this.canvas, "mouseup")
            .subscribe((event: MouseEvent) => {
                const target = event.target as HTMLElement

                // 如果之前已经按下
                if (this.obj && this.flag === 1
                    && (target.localName === "main-canvas" || target.localName === "canvas")) {

                    // 结束对象绘制
                    this.obj.blur(event.offsetX * this.dpr, event.offsetY * this.dpr)

                    // 保存当前快照
                    this.setCanvas()

                    if (this.obj instanceof Text) {
                        // 如果是文本类型，结束后就新建一个文本对象
                        this.obj = objectsMap("text", this.ctx)
                    } else if (this.obj instanceof ImageObject) {
                        // 如果是图片类型，结束后回到默认状态
                        this.obj = null
                    }

                    this.flag = 0
                }
            })
    }

    setCanvas(): void {
        canvasSnapshot.set(this.ctx.getImageData(0, 0, this.vw, this.vh))
    }

    getCanvas(): void {
        this.ctx.putImageData(canvasSnapshot.get(), 0, 0)
    }

    clearCanvas(): void {
        canvasHistory.clear()
        canvasHistory.clearCanvas(this.ctx)
        this.setCanvas()
        canvasFile.change()

        if (canvasConnection.status !== "normal") {
            canvasConnection.send("clear")
        }
    }
}

window.customElements.define("main-canvas", MainCanvas)
