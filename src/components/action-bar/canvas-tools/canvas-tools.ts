export default class CanvasTools extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <section>
                <action-button icon="cursor" tooltip="正常"></action-button>
                <tool-button icon="circle" tooltip="圆形"></tool-button>
                <tool-button icon="square" tooltip="矩形"></tool-button>
                <tool-button icon="line" tooltip="线"></tool-button>
                <tool-button icon="text" tooltip="文本"></tool-button>
                <tool-button icon="image" tooltip="图像"></tool-button>
                <action-button icon="clear" tooltip="清空画布"></action-button>
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
