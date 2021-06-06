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
    objectFrame
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

        fromEvent(this.canvas, "mousedown")
            .subscribe((event: MouseEvent) => {
                event.preventDefault()
                const target = event.target as HTMLElement
                if (this.obj
                    && (target.localName === "main-canvas" || target.localName === "canvas")) {
                    this.obj.create(event.offsetX * this.dpr, event.offsetY * this.dpr)
                    objectOptionEmitter.emit("blur")
                    this.setCanvas()

                    this.flag = 1
                } else if (!this.obj && canvasTool.tool === "cursor"
                    && (target.localName === "main-canvas" || target.localName === "canvas")) {
                    if (objectFrame.mounted === 1 && objectFrame.display === 1) {
                        objectFrame.hide()
                    }
                    this.focusObject(event.offsetX * this.dpr, event.offsetY * this.dpr)
                }
            })

        fromEvent(this.canvas, "mousemove")
            .subscribe((event: MouseEvent) => {
                event.preventDefault()
                window.requestAnimationFrame(() => {
                    const target = event.target as HTMLElement
                    if (this.obj && this.obj.active
                        && (target.localName === "main-canvas" || target.localName === "canvas")) {
                        this.getCanvas()
                        this.obj.draw(event.offsetX * this.dpr, event.offsetY * this.dpr)
                    }

                    if (this.obj && this.obj instanceof ImageObject) {
                        this.obj.follow(event.offsetX * this.dpr, event.offsetY * this.dpr)
                    }
                })

            })

        fromEvent(this.canvas, "mouseup")
            .subscribe((event: MouseEvent) => {
                const target = event.target as HTMLElement
                if (this.obj && this.flag === 1
                    && (target.localName === "main-canvas" || target.localName === "canvas")) {
                    this.obj.blur(event.offsetX * this.dpr, event.offsetY * this.dpr)
                    this.setCanvas()

                    if (this.obj instanceof Text) {
                        this.obj = objectsMap("text", this.ctx)
                    } else if (this.obj instanceof ImageObject) {
                        this.obj = null
                    }

                    this.flag = 0
                }
            })
    }

    focusObject(x: number, y: number): void {
        canvasHistory.clearCanvas(canvasContext.ctx)
        let once = 0
        for (let i = canvasHistory.history.length - 1; i >= 0; i--) {
            const ctx = canvasContext.ctx
            const object = canvasHistory.history[i]
            canvasHistory.reDrawOnce(object)
            if (once === 0 && ctx.isPointInPath(x, y)) {
                const minX = Math.min(object.x, object.ex)
                const minY = Math.min(object.y, object.ey)
                const dx = Math.abs(object.x - object.ex)
                const dy = Math.abs(object.y - object.ey)

                objectFrame.move(minX, minY, dx, dy)
                objectFrame.show()
                once = 1
            }
        }
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
