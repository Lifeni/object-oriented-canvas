export default class AppMenu extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <action-button icon="menu" id="menu-button" class="menu-button"></action-button>
            <div class="menu" role="menu" id="menu">
                <menu-item action="open-file">打开</menu-item>
                <menu-item action="save-file">保存</menu-item>
                <menu-item action="save-as">另存为</menu-item>
                <div class="divider"></div>
                <menu-item action="reload-window">重新加载窗口</menu-item>
                <menu-item action="toggle-devtools">切换 DevTools</menu-item>
                <div class="divider"></div>
                <menu-item action="open-about-dialog">关于</menu-item>
                <menu-item action="quit-app">退出</menu-item>
            </div>
            <style>${this.stylesheet}</style>
        `

        const menu = shadowRoot.getElementById("menu")
        const button = shadowRoot.getElementById("menu-button")

        button.addEventListener("click", () => {
            menu.classList.toggle("show")
        })

        button.addEventListener("blur", () => {
            setTimeout(() => {
                menu.classList.remove("show")
            }, 200)
        })
    }

    readonly stylesheet = `
        :host {
            position: relative;
        }
        
        .menu {
            position: absolute;
            left: 8px;
            top: 56px;
            width: fit-content;
            padding: 8px 0;
            display: flex;
            flex-direction: column;
            background: #2c2c2c;
            border-radius: 4px;
            visibility: hidden;         
        }
        
        .menu.show {
            visibility: visible;
        }
        
        .menu::before {
            content: "";
            position: absolute;
            left: 10px;
            top: -12px;
            display: block;
            width: 0;
            height: 0;
            border: solid 6px transparent;
            border-bottom: solid 6px #2c2c2c;
        }
             
        .divider {
            width: 100%;
            border-top: solid 1px #424242;
            height: 0;
            margin: 6px 0;
        }
    `
}

window.customElements.define("app-menu", AppMenu)
