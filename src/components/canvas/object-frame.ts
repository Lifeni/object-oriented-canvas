import { fromEvent } from "rxjs"

export default class ObjectFrame extends HTMLElement {

    constructor() {
        super()

        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
            <div>
                <section>
                    <button class="delete" id="delete" aria-label="删除" title="删除">
                        ${this.iconMap("delete")}
                    </button>
                    <button class="resize" id="resize" aria-label="调整大小" title="调整大小">
                        ${this.iconMap("resize")}
                    </button>
                </section>
            </div>
            ${this.stylesheet}
        `

        this.handleEvent(shadowRoot)
    }

    handleEvent(shadow: ShadowRoot): void {
        const close = shadow.getElementById("delete")
        fromEvent(close, "click").subscribe(() => {
            this.classList.remove("show")
        })
    }

    readonly stylesheet = `
        <style>
            :host {
                position: absolute;
                z-index: 20;
                display: none;
            }
            
            :host(.show) {
                display: initial;
            }
        
            div {
                position: relative;
                width: 100%;
                height: 100%;
                padding: 0;
                box-sizing: border-box;
                border: none;
                outline: solid 4px #18a0fb;
                background: transparent;
                resize: none;
                transition: all 0.1s;
                cursor: move;
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
            
            .resize {
                background: #017dd0;
                cursor: nwse-resize;
            }
            
            .delete {
                background: #e81123
            }
            
            button svg {
                width: 16px;
                height: 16px;
                fill: #ffffff;
            }
            
            button svg g,
            button svg path {
                fill: #ffffff;
            }
        </style>
    `

    readonly iconMap = (name: string): string => {
        switch (name) {
            case "resize": {
                return `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.9987 12.7481L20.9982 20.3019L20.9843 20.4021L20.9567 20.5009L20.9307 20.562C20.8959 20.6411 20.8453 20.715 20.7804 20.7799L20.7363 20.8206L20.6549 20.8812L20.5898 20.9183L20.4995 20.957L20.4354 20.9762L20.3715 20.9898L20.2783 20.9991L12.7448 20.9996C12.3306 20.9996 11.9948 20.6638 11.9948 20.2496C11.9948 19.8699 12.277 19.5561 12.643 19.5065L12.7448 19.4996L18.4407 19.4991L4.4957 5.55911L4.49481 11.2496C4.49481 11.6293 4.21266 11.9431 3.84658 11.9928L3.74481 11.9996C3.36512 11.9996 3.05132 11.7175 3.00166 11.3514L2.99481 11.2496L2.99558 3.71378L2.99844 3.68479C3.00306 3.61873 3.01689 3.55602 3.03798 3.49674L3.07689 3.40661L3.08739 3.38942C3.19778 3.18522 3.40083 3.03877 3.64018 3.00535L3.74481 2.99811L11.2487 2.99811C11.6629 2.99811 11.9987 3.3339 11.9987 3.74811C11.9987 4.12781 11.7165 4.4416 11.3505 4.49126L11.2487 4.49811L5.5567 4.49811L19.4997 18.4381L19.4987 12.7481C19.4987 12.3684 19.7809 12.0546 20.1469 12.005L20.2487 11.9981C20.6284 11.9981 20.9422 12.2803 20.9919 12.6463L20.9987 12.7481Z" fill="#212121"/>
                    </svg>
                `
            }
            case "delete": {
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

window.customElements.define("object-frame", ObjectFrame)
