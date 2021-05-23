export default class MainCanvas extends HTMLElement {

    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D

    screenWidth = window.screen.width * window.devicePixelRatio
    screenHeight = window.screen.height * window.devicePixelRatio

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
    }

    initCanvas(): void {
        this.ctx.canvas.width = this.screenWidth
        this.ctx.canvas.height = this.screenHeight
    }

    tryDraw(): void {
        this.ctx.font = "48px Inter"
        this.ctx.fillText("Hello, Electron", 80, 108)

        this.ctx.font = "24px Inter"
        this.ctx.fillText("🎨 Object-oriented Canvas", 80, 160)
    }

    readonly stylesheet = `
        canvas {
            width: ${window.screen.width}px;
            height: ${window.screen.height}px;
        }
    `
}

window.customElements.define("main-canvas", MainCanvas)
