import Base from "../bases/base"

export default class SharePropertyBar extends Base {

    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <section>
                <h1>协作</h1>
                
                <div>
                    <p class="status blue">已启用主机服务</p>
                    <!-- <p class="status green">已连接到主机</p>-->
                
                    <label>
                        地址
                        <input 
                            type="text" 
                            placeholder="http://localhost:20216" 
                            value="http://localhost:20216"
                            id="connect-to" 
                            data-option="connectTo" 
                        />
                    </label>
                    <button>连接</button>
                    <button>作为主机</button>
                </div>
                
            </section>
            ${this.stylesheet}
        `

        this.handleBlur(shadowRoot)
    }
}

window.customElements.define("share-property-bar", SharePropertyBar)
