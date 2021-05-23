export default class CanvasTools extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
        <section>
            <action-button icon="cursor" tooltip="正常"></action-button>
            <action-button icon="circle" tooltip="圆形"></action-button>
            <action-button icon="square" tooltip="矩形"></action-button>
            <action-button icon="line" tooltip="线"></action-button>
            <action-button icon="text" tooltip="文本"></action-button>
            <action-button icon="image" tooltip="图像"></action-button>
        </section>
        <style>${this.stylesheet}</style>
        `
    }

    readonly stylesheet = `
        :host {
            margin: 0 auto 0 0;
        }
    
        section {
            display: flex;
            -webkit-app-region: none;
        }
    `
}

window.customElements.define("canvas-tools", CanvasTools)
