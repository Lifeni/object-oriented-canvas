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
                pointer-events: none;
            }
        
            img {
                width: 100px;
                height: 100px;
                border: solid 6px #ffffff;
                border-radius: 4px;
                opacity: 0.95;
                box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
                object-fit: cover;
            }
           
        </style>
    `
}

window.customElements.define("image-preview", ImagePreview)
