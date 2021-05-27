export default class BasePropertyBar extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <section>
                <slot></slot>
            </section>
            ${this.stylesheet}
        `
    }

    readonly stylesheet = `
        <style>
            section {
                position: absolute;
                left: 0;
                top: 48px;
                width: 100%;
                height: 48px;
                padding: 12px 24px;
                display: flex;
                align-items: center;
                color: #fff;
                background: #2c2c2c;
                box-sizing: border-box;
            }
        </style>
    `
}

window.customElements.define("property-bar", BasePropertyBar)
