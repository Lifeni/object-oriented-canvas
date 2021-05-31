import { textOption } from "../../store"
import { fromEvent } from "rxjs"
import { textInputEmitter } from "../../emitter"

export default class TextInput extends HTMLElement {

    public textarea: HTMLTextAreaElement

    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <textarea class="text-input" id="text-input" placeholder="在此输入文字"></textarea>
            <section>
                <button class="cancel" id="cancel" aria-label="取消" title="取消">
                    ${this.iconMap("cancel")}
                </button>
                <button class="ok" id="ok" aria-label="确定" title="确定">
                    ${this.iconMap("ok")}
                </button>
            </section>
            ${this.stylesheet}
        `

        this.textarea = shadowRoot.getElementById("text-input") as HTMLTextAreaElement
        this.handleEvent(shadowRoot)
    }

    handleEvent = (shadow: ShadowRoot): void => {
        const ok = shadow.getElementById("ok")
        const cancel = shadow.getElementById("cancel")

        fromEvent(ok, "click")
            .subscribe(() => {
                textInputEmitter.emit("ok", {
                    value: this.textarea.value,
                    id: this.dataset.id
                })
            })

        fromEvent(cancel, "click")
            .subscribe(() => textInputEmitter.emit("cancel", {
                id: this.dataset.id
            }))

        fromEvent(this.textarea, "keydown")
            .subscribe((event: KeyboardEvent) => {
                if (event.key === "Enter") {
                    ok.click()
                }
            })
    }

    readonly stylesheet = `
        <style>
            :host {
                position: absolute;
                z-index: 20;
            }
        
            textarea {
                position: relative;
                width: 100%;
                height: 100%;
                padding: 8px 12px;
                background: transparent;
                box-sizing: border-box;
                font-size: ${textOption.option.fontSize}px;
                font-family: ${textOption.option.fontFamily};
                line-height: 1.5;
                color: ${textOption.option.fontColor};
                font-weight: ${textOption.option.isBold ? `bold` : `normal`};
                font-style: ${textOption.option.isItalic ? `italic` : `normal`};
                border: solid 2px #18a0fb;
                outline: solid 0 #18a0fb;
                resize: none;
                transition: all 0.1s;
            }
            
            textarea::placeholder {
                color: ${textOption.option.fontColor};
            }
            
            textarea:focus {
                border-color: transparent;
                outline: solid 4px #18a0fb;
            }
            
            section {
                position: absolute;
                right: 0;
                top: -12px;
                width: fit-content;
                height: calc(100% + 24px);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                padding: 0;
                gap: 8px;
                box-sizing: border-box;
                pointer-events: none;
            }
            
            button {
                width: 28px;
                height: 28px;
                padding: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.75rem;
                font-weight: bold;
                border-radius: 48px;
                border: none;
                color: #ffffff;
                cursor: pointer;
                transform: translateX(50%);
                outline: none;
                pointer-events: initial;
            }
            
            .ok {
                background: #017dd0;
            }
            
            .cancel {
                background: #e81123
            }
            
            button svg {
                width: 16px;
                height: 16px;
            }
            
            button svg g {
                fill: #ffffff;
            }
        </style>
    `

    readonly iconMap = (name: string): string => {
        switch (name) {
            case "ok": {
                return `
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="ic_fluent_checkmark_24_regular" fill="#212121" fill-rule="nonzero">
                                <path d="M4.53033009,12.9696699 C4.23743687,12.6767767 3.76256313,12.6767767 3.46966991,12.9696699 C3.1767767,13.2625631 3.1767767,13.7374369 3.46966991,14.0303301 L7.96966991,18.5303301 C8.26256313,18.8232233 8.73743687,18.8232233 9.03033009,18.5303301 L20.0303301,7.53033009 C20.3232233,7.23743687 20.3232233,6.76256313 20.0303301,6.46966991 C19.7374369,6.1767767 19.2625631,6.1767767 18.9696699,6.46966991 L8.5,16.9393398 L4.53033009,12.9696699 Z" id="🎨-Color"></path>
                            </g>
                        </g>
                    </svg>
                `
            }
            case "cancel": {
                return `
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="ic_fluent_dismiss_24_regular" fill="#212121" fill-rule="nonzero">
                                <path d="M4.39705176,4.55378835 L4.46966991,4.46966991 C4.73593648,4.20340335 5.15260016,4.1791973 5.44621165,4.39705176 L5.53033009,4.46966991 L12,10.939 L18.4696699,4.46966991 C18.7625631,4.1767767 19.2374369,4.1767767 19.5303301,4.46966991 C19.8232233,4.76256313 19.8232233,5.23743687 19.5303301,5.53033009 L13.061,12 L19.5303301,18.4696699 C19.7965966,18.7359365 19.8208027,19.1526002 19.6029482,19.4462117 L19.5303301,19.5303301 C19.2640635,19.7965966 18.8473998,19.8208027 18.5537883,19.6029482 L18.4696699,19.5303301 L12,13.061 L5.53033009,19.5303301 C5.23743687,19.8232233 4.76256313,19.8232233 4.46966991,19.5303301 C4.1767767,19.2374369 4.1767767,18.7625631 4.46966991,18.4696699 L10.939,12 L4.46966991,5.53033009 C4.20340335,5.26406352 4.1791973,4.84739984 4.39705176,4.55378835 L4.46966991,4.46966991 L4.39705176,4.55378835 Z" id="🎨-Color"></path>
                            </g>
                        </g>
                    </svg>
                `
            }
        }
    }
}

window.customElements.define("text-input", TextInput)
