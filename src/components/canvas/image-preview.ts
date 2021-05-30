export default class ImagePreview extends HTMLElement {

    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <img id="image-preview" alt="导入图片预览" />
            ${this.stylesheet}
        `
    }

    readonly stylesheet = `
        <style>
            :host {
                position: absolute;
                width: 120px;
                display: flex;
                flex-direction: column;
                border: solid 6px #ffffff;
                border-radius: 4px;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
                background: #ffffff;
                pointer-events: none;
            }
        
            img {
                width: 100%;
                object-fit: cover;
            }
           
        </style>
    `
}

window.customElements.define("image-preview", ImagePreview)
