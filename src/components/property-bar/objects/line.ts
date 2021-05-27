export default class LinePropertyBar extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <property-bar>
                <label for="stroke-width">线宽度</label>
                <input type="number" placeholder="1" id="stroke-width" />
            </property-bar>
            ${this.stylesheet}
        `
    }

    readonly stylesheet = `
        <style>
            label {
                margin: 0 16px 0 0;
                font-size: 0.875rem;
            }
            
            input {
                width: 48px;
                height: 24px;
                padding: 0 8px;
                border: none;
                border-radius: 4px;
                color: #fff;
                background: rgba(255, 255, 255, 0.1);
                outline: none;
            }
        </style>
    `
}

window.customElements.define("line-property-bar", LinePropertyBar)
