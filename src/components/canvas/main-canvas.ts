import { fromEvent } from "rxjs"
import { canvasToolEmitter } from "../../emitter"
import { canvasHistory, canvasTool } from "../../store"
import Rectangle from "../../objects/Rectangle"

export default class MainCanvas extends HTMLElement {

    public canvas: HTMLCanvasElement
    public ctx: CanvasRenderingContext2D

    public dpr = devicePixelRatio
    public vw = window.screen.width * this.dpr
    public vh = window.screen.height * this.dpr

    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <canvas id="canvas" class="canvas">这是一块画布</canvas>
            <style>${this.stylesheet}</style>
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
    }

    tryDraw(): void {
        this.ctx.font = "48px Inter"
        this.ctx.fillText("Hello, Electron", 80, 108)

        this.ctx.font = "24px Inter"
        this.ctx.fillText("🎨 Object-oriented Canvas", 80, 160)
    }

    handleEvent(): void {
        canvasToolEmitter.on("canvas-tool", (event) => {
            if (event.current === "clear") {
                if (confirm("确定清空画板吗？")) {
                    this.clearCanvas()
                }
                canvasTool.setDefault()
            } else {
                canvasTool.setTool(event.current)
            }
        })

        const rect = new Rectangle(this.ctx)

        fromEvent(this.canvas, "mousedown")
            .subscribe((event: MouseEvent) => {
                event.preventDefault()
                rect.create(event.offsetX * this.dpr, event.offsetY * this.dpr)
            })

        fromEvent(this.canvas, "mousemove")
            .subscribe((event: MouseEvent) => {
                event.preventDefault()
                window.requestAnimationFrame(() => {
                    if (rect.active && canvasTool.tool === "rectangle") {
                        this.lastCanvas()
                        rect.draw(event.offsetX * this.dpr, event.offsetY * this.dpr)
                    }
                })

            })

        fromEvent(this.canvas, "mouseup")
            .subscribe((event: MouseEvent) => {
                event.preventDefault()
                rect.blur()
                this.pushCanvas()
            })
    }

    pushCanvas(): void {
        canvasHistory.push(this.ctx.getImageData(0, 0, this.vw, this.vh))
    }

    lastCanvas(): void {
        this.ctx.putImageData(canvasHistory.last(), 0, 0)
    }

    clearCanvas(): void {
        this.ctx.clearRect(0, 0, this.vw, this.vh)
        this.pushCanvas()
    }

    readonly stylesheet = `
        canvas {
            width: ${window.screen.width}px;
            height: ${window.screen.height}px;
        }
    `
}

window.customElements.define("main-canvas", MainCanvas)
