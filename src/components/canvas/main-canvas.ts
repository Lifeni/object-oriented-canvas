import { fromEvent } from "rxjs"
import { canvasEmitter, objectOptionEmitter } from "../../emitter"
import { canvasElement, canvasSnapshot, canvasTool } from "../../store"
import { canvasObjectMap, CanvasObjects } from "../../utils/canvasObjectMap"
import Text from "../../objects/Text"
import { ipcRenderer } from "electron"
import ImageObject from "../../objects/Image"

export default class MainCanvas extends HTMLElement {

    public canvas: HTMLCanvasElement
    public ctx: CanvasRenderingContext2D

    public dpr = devicePixelRatio
    public vw = window.screen.width * this.dpr
    public vh = window.screen.height * this.dpr

    public obj: CanvasObjects
    public type: "vector" | "binary" = "vector"

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
        this.tryDraw()
        this.handleEvent()
    }

    initCanvas(): void {
        this.ctx.canvas.width = this.vw
        this.ctx.canvas.height = this.vh

        this.ctx.save()
        this.ctx.fillStyle = "#fff"
        this.ctx.fillRect(0, 0, this.vw, this.vh)
        this.ctx.restore()

        this.setCanvas()
        canvasElement.set(this.canvas)
    }

    tryDraw(): void {
        this.ctx.font = "48px Inter"
        this.ctx.fillText("Hello, Electron", 80, 108)

        this.ctx.font = "24px Inter"
        this.ctx.fillText("🎨 Object-oriented Canvas", 80, 160)

        this.setCanvas()
    }

    handleEvent(): void {
        canvasEmitter.on("canvas-tool", event => {
            if (event.current === "clear") {
                this.clearCanvas()
            } else if (event.current === "image") {
                ipcRenderer.send("import-image")
                ipcRenderer.once("import-image-data", (_, data: IImportImageData) => {
                    this.obj = canvasObjectMap(event.current, this.ctx, data)
                    this.type = "binary"
                })
                canvasTool.setDefault()
            } else {
                canvasTool.setTool(event.current)
                this.obj = canvasObjectMap(event.current, this.ctx)
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
                if (this.obj
                    && (target.localName === "main-canvas" || target.localName === "canvas")) {
                    this.obj.blur(event.offsetX * this.dpr, event.offsetY * this.dpr)
                    this.setCanvas()

                    if (this.obj instanceof Text) {
                        this.obj = canvasObjectMap("text", this.ctx)
                    } else if (this.obj instanceof ImageObject) {
                        this.obj = null
                    }
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
        this.ctx.save()
        this.ctx.clearRect(0, 0, this.vw, this.vh)
        this.ctx.fillStyle = "#fff"
        this.ctx.fillRect(0, 0, this.vw, this.vh)
        this.ctx.restore()
        this.setCanvas()
    }
}

window.customElements.define("main-canvas", MainCanvas)
