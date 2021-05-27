import { fromEvent } from "rxjs"
import { canvasToolEmitter } from "../../emitter"
import { canvasHistory, canvasTool } from "../../store"
import { canvasObjectMap, CanvasObjects } from "../../utils/canvasObjectMap"

export default class MainCanvas extends HTMLElement {

    public canvas: HTMLCanvasElement
    public ctx: CanvasRenderingContext2D

    public dpr = devicePixelRatio
    public vw = window.screen.width * this.dpr
    public vh = window.screen.height * this.dpr

    public obj: CanvasObjects

    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <property-bar-switcher></property-bar-switcher>
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
        this.setCanvas()
    }

    tryDraw(): void {
        this.ctx.font = "48px Inter"
        this.ctx.fillText("Hello, Electron", 80, 108)

        this.ctx.font = "24px Inter"
        this.ctx.fillText("🎨 Object-oriented Canvas", 80, 160)

        this.setCanvas()
    }

    handleEvent(): void {
        canvasToolEmitter.on("canvas-tool", (event) => {
            if (event.current === "clear") {
                if (confirm("确定清空画布吗？")) {
                    this.clearCanvas()
                }
                canvasTool.setDefault()
            } else {
                canvasTool.setTool(event.current)
                this.obj = canvasObjectMap(event.current, this.ctx)
            }
        })

        fromEvent(this.canvas, "mousedown")
            .subscribe((event: MouseEvent) => {
                event.preventDefault()
                if (this.obj) {
                    this.obj.create(event.offsetX * this.dpr, event.offsetY * this.dpr)
                }
            })

        fromEvent(this.canvas, "mousemove")
            .subscribe((event: MouseEvent) => {
                event.preventDefault()
                window.requestAnimationFrame(() => {
                    if (this.obj && this.obj.active) {
                        this.getCanvas()
                        this.obj.draw(event.offsetX * this.dpr, event.offsetY * this.dpr)
                    }
                })

            })

        fromEvent(this.canvas, "mouseup")
            .subscribe((event: MouseEvent) => {
                event.preventDefault()
                if (this.obj) {
                    this.obj.blur()
                    this.setCanvas()
                }
            })
    }

    setCanvas(): void {
        canvasHistory.set(this.ctx.getImageData(0, 0, this.vw, this.vh))
    }

    getCanvas(): void {
        this.ctx.putImageData(canvasHistory.get(), 0, 0)
    }

    clearCanvas(): void {
        this.ctx.clearRect(0, 0, this.vw, this.vh)
        this.setCanvas()
    }

    readonly stylesheet = `
        <style>
            canvas {
                width: ${window.screen.width}px;
                height: ${window.screen.height}px;
            }
        </style>
    `
}

window.customElements.define("main-canvas", MainCanvas)
