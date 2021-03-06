export default class ActionBar extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <header>
                <slot></slot>
                <section>
                    <action-button icon="minimize" action="minimize-window"></action-button>
                    <action-button icon="maximize" action="maximize-window"></action-button>
                    <action-button icon="close" action="close-window" class="danger"></action-button>
                </section>
            </header>
            ${this.stylesheet}
        `
    }

    readonly stylesheet = `
        <style>
            header {
                width: 100%;
                height: 48px;
                display: flex;
                justify-content: space-between;
                color: #fff;
                background: #222222;
                -webkit-app-region: drag;
            }
            
            section {
                display: flex;
                -webkit-app-region: none;
            }
        </style>
    `
}

window.customElements.define("action-bar", ActionBar)
