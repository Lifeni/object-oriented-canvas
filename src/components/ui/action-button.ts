import { ipcRenderer } from "electron"

export default class ActionButton extends HTMLElement {
    static get observedAttributes(): Array<string> {
        return ["icon", "action"]
    }

    readonly icon = this.getAttribute("icon")
    readonly action = this.getAttribute("action")

    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
        <button >
            ${ActionButton.iconMap(this.icon)}
        </button>
        <style>${this.stylesheet}</style>
        `

        this.addEventListener("click", () => {
            if (this.action) {
                ipcRenderer.send(this.action)
            }
        })
    }

    static iconMap(name: string): string {
        switch (name) {
            case "menu":
                return `
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="ic_fluent_navigation_24_regular" fill="#212121" fill-rule="nonzero">
                            <path d="M2.75254822,18 L21.2525482,18 C21.6667618,18 22.0025482,18.3357864 22.0025482,18.75 C22.0025482,19.1296958 21.7203943,19.443491 21.3543188,19.4931534 L21.2525482,19.5 L2.75254822,19.5 C2.33833466,19.5 2.00254822,19.1642136 2.00254822,18.75 C2.00254822,18.3703042 2.2847021,18.056509 2.65077766,18.0068466 L2.75254822,18 L21.2525482,18 L2.75254822,18 Z M2.75254822,11.5030063 L21.2525482,11.5030063 C21.6667618,11.5030063 22.0025482,11.8387927 22.0025482,12.2530063 C22.0025482,12.6327021 21.7203943,12.9464972 21.3543188,12.9961597 L21.2525482,13.0030063 L2.75254822,13.0030063 C2.33833466,13.0030063 2.00254822,12.6672199 2.00254822,12.2530063 C2.00254822,11.8733105 2.2847021,11.5595153 2.65077766,11.5098529 L2.75254822,11.5030063 L21.2525482,11.5030063 L2.75254822,11.5030063 Z M2.75168905,5.0032392 L21.251689,5.0032392 C21.6659026,5.0032392 22.001689,5.33902564 22.001689,5.7532392 C22.001689,6.13293497 21.7195352,6.44673016 21.3534596,6.49639258 L21.251689,6.5032392 L2.75168905,6.5032392 C2.33747549,6.5032392 2.00168905,6.16745276 2.00168905,5.7532392 C2.00168905,5.37354343 2.28384293,5.05974824 2.64991849,5.01008582 L2.75168905,5.0032392 L21.251689,5.0032392 L2.75168905,5.0032392 Z" id="🎨-Color"></path>
                            </g>
                        </g>
                    </svg>
                `
            case "minimize":
                return `
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.75488 12.4995H20.2468C20.661 12.4995 20.9968 12.1638 20.9968 11.7495C20.9968 11.3353 20.661 10.9995 20.2468 10.9995H3.75488C3.34067 10.9995 3.00488 11.3353 3.00488 11.7495C3.00488 12.1638 3.34067 12.4995 3.75488 12.4995Z" fill="#212121"/>
                    </svg>
                `
            case "maximize":
                return `
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.75 3H18.25C19.7688 3 21 4.23122 21 5.75V18.25C21 19.7688 19.7688 21 18.25 21H5.75C4.23122 21 3 19.7688 3 18.25V5.75C3 4.23122 4.23122 3 5.75 3ZM5.75 4.5C5.05964 4.5 4.5 5.05964 4.5 5.75V18.25C4.5 18.9404 5.05964 19.5 5.75 19.5H18.25C18.9404 19.5 19.5 18.9404 19.5 18.25V5.75C19.5 5.05964 18.9404 4.5 18.25 4.5H5.75Z" fill="#212121"/>
                    </svg>
                `

            case "close":
                return `
                    <svg   viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="ic_fluent_dismiss_24_regular" fill="#212121" fill-rule="nonzero">
                                <path d="M4.39705176,4.55378835 L4.46966991,4.46966991 C4.73593648,4.20340335 5.15260016,4.1791973 5.44621165,4.39705176 L5.53033009,4.46966991 L12,10.939 L18.4696699,4.46966991 C18.7625631,4.1767767 19.2374369,4.1767767 19.5303301,4.46966991 C19.8232233,4.76256313 19.8232233,5.23743687 19.5303301,5.53033009 L13.061,12 L19.5303301,18.4696699 C19.7965966,18.7359365 19.8208027,19.1526002 19.6029482,19.4462117 L19.5303301,19.5303301 C19.2640635,19.7965966 18.8473998,19.8208027 18.5537883,19.6029482 L18.4696699,19.5303301 L12,13.061 L5.53033009,19.5303301 C5.23743687,19.8232233 4.76256313,19.8232233 4.46966991,19.5303301 C4.1767767,19.2374369 4.1767767,18.7625631 4.46966991,18.4696699 L10.939,12 L4.46966991,5.53033009 C4.20340335,5.26406352 4.1791973,4.84739984 4.39705176,4.55378835 L4.46966991,4.46966991 L4.39705176,4.55378835 Z" id="🎨-Color"></path>
                            </g>
                        </g>
                    </svg>
                `

            default:
                return ""
        }
    }

    readonly stylesheet = `
        button {
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            border: none;
            background: transparent;
            -webkit-app-region: none;
            cursor: pointer;
            outline: none;
        }
        
        button:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        
        svg {
            width: 18px;
            height: 18px;
            fill: #fff;
        }
        
        svg g,
        svg path {
            fill: #fff;
        }
    `
}

window.customElements.define("action-button", ActionButton)
