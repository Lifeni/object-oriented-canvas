export default class CanvasTools extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <section>
                <tool-button icon="cursor" tooltip="正常" type="cursor"></tool-button>
                <tool-button icon="circle" tooltip="圆形" type="circle" focusable="true" property="true"></tool-button>
                <tool-button icon="square" tooltip="矩形" type="rectangle" focusable="true" property="true"></tool-button>
                <tool-button icon="line" tooltip="线" type="line" focusable="true" property="true"></tool-button>
                <tool-button icon="text" tooltip="文本" type="text" focusable="true" property="true"></tool-button>
                <tool-button icon="image" tooltip="图像" type="image"></tool-button>
                <tool-button icon="clear" tooltip="清空画布" type="clear"></tool-button>
            </section>
            ${this.stylesheet}
        `
    }

    readonly stylesheet = `
        <style>
            :host {
                margin: 0 auto 0 0;
            }
        
            section {
                display: flex;
                -webkit-app-region: none;
            }
        </style>
    `
}

window.customElements.define("canvas-tools", CanvasTools)
