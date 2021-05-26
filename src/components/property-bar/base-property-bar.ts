export default class BasePropertyBar extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <section>
                <slot></slot>
            </section>
            <style>${this.stylesheet}</style>
        `
    }

    readonly stylesheet = `
        section {
            position: absolute;
            left: 0;
            top: 48px;
            width: 100%;
            height: 48px;
            display: flex;
            justify-content: space-between;
            color: #fff;
            background: #2c2c2c;
        }
    `
}

window.customElements.define("property-bar", BasePropertyBar)
