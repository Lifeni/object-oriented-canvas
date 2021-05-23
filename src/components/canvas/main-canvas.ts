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
    }

    initCanvas(): void {
        this.ctx.canvas.width = this.screenWidth
        this.ctx.canvas.height = this.screenHeight
    }

    readonly stylesheet = `
        canvas {
            width: ${this.screenWidth}px;
            height: calc(${this.screenHeight}px - 48px);
        }
    `
}

window.customElements.define("main-canvas", MainCanvas)
