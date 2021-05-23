export default class AppMenu extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <action-button icon="menu" id="menu-button"></action-button>
            <div class="menu" role="menu" id="menu">
                <menu-item action="open-file">打开</menu-item>
                <menu-item action="save-file">保存</menu-item>
                <menu-item action="save-as">另存为</menu-item>
                <div class="divider"></div>
                <menu-item action="open-devtools">开发者工具</menu-item>
                <div class="divider"></div>
                <menu-item action="open-about">关于</menu-item>
                <menu-item action="quit-app">退出</menu-item>
            </div>
            <style>${this.stylesheet}</style>
        `

        shadowRoot.getElementById("menu-button")
            .addEventListener("click", () => this.toggleMenu(shadowRoot))
    }

    toggleMenu(shadow: ShadowRoot): void {
        const menu = shadow.getElementById("menu")
        if (menu) {
            menu.classList.toggle("show")
        }
    }

    readonly stylesheet = `
        :host {
            position: relative;
        }
        
        .menu {
            position: absolute;
            left: 0;
            top: 48px;
            width: fit-content;
            padding: 8px 0;
            display: flex;
            flex-direction: column;
            background: #2c2c2c;
            border-radius: 0 0 4px 4px;
            visibility: hidden;         
        }
        
        .menu.show {
            visibility: visible;
        }
             
        .divider {
            width: 100%;
            border-top: solid 1px #424242;
            height: 0;
            margin: 8px 0;
        }
    `
}

window.customElements.define("app-menu", AppMenu)
