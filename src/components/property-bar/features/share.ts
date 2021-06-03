import Base from "../bases/base"
import { fromEvent } from "rxjs"
import { clipboard, ipcRenderer } from "electron"
import { canvasConnection } from "../../../store"
import { startClient } from "../../../socket/client"

export default class SharePropertyBar extends Base {

    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <section>
                <h1>协作</h1>
                
                <div>
                    ${canvasConnection.status === "hosted" ? `<p class="status blue">已启用主机服务</p>` :
            canvasConnection.status === "connected" ? `<p class="status green">已连接到主机</p>` : ``}

                    <label>
                        地址
                        <input 
                            type="text" 
                            placeholder="http://localhost:20216" 
                            value=${canvasConnection.path || "http://localhost:20216"}
                            id="remote-path"                      
                        />
                    </label>
                    ${canvasConnection.status === "normal" ? `
                        <button id="connect-server">连接</button>
                        <button id="host-server">作为主机</button>
                    ` : `
                        <button id="copy-path">拷贝</button>
                        <button id="close-server">断开连接</button>
                    `} 
                </div>
            </section>
            ${this.stylesheet}
        `

        this.handleBlur(shadowRoot)
        this.handleEvent(shadowRoot)
    }

    handleEvent(shadow: ShadowRoot): void {
        const input = shadow.getElementById("remote-path") as HTMLInputElement

        const connect = shadow.getElementById("connect-server")
        const host = shadow.getElementById("host-server")
        const copy = shadow.getElementById("copy-path")
        const close = shadow.getElementById("close-server")

        host && fromEvent(host, "click").subscribe(() => {
            ipcRenderer.send("start-server", { path: input.value })

            const socket = startClient(input.value)
            canvasConnection.setSocket(socket)
            canvasConnection.host(input.value)
        })

        connect && fromEvent(connect, "click").subscribe(() => {
            try {
                const socket = startClient(input.value)

                canvasConnection.setSocket(socket)
                canvasConnection.connect(input.value)
            } catch (error) {
                console.error(error)
            }
        })

        copy && fromEvent(copy, "click").subscribe(() => {
            clipboard.writeText(input.value || "")
            copy.textContent = "已拷贝"
            setTimeout(() => {
                copy.textContent = "拷贝"
            }, 3000)
        })

        close && fromEvent(close, "click").subscribe(() => {
            ipcRenderer.send("close-server")
            canvasConnection.close()
        })
    }
}

window.customElements.define("share-property-bar", SharePropertyBar)
