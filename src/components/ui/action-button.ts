import { ipcRenderer } from "electron"

export default class ActionButton extends HTMLElement {
    static get observedAttributes(): Array<string> {
        return ["icon", "action", "tooltip"]
    }

    readonly icon = this.getAttribute("icon")
    readonly action = this.getAttribute("action")
    readonly tooltip = this.getAttribute("tooltip")

    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.innerHTML = `
        <button >
            ${this.iconMap(this.icon)}
        </button>
        <style>${this.stylesheet}</style>
        `

        this.addEventListener("click", () => {
            if (this.action) {
                ipcRenderer.send(this.action)
            }
        })
    }

    iconMap(name: string): string {
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
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="ic_fluent_dismiss_24_regular" fill="#212121" fill-rule="nonzero">
                                <path d="M4.39705176,4.55378835 L4.46966991,4.46966991 C4.73593648,4.20340335 5.15260016,4.1791973 5.44621165,4.39705176 L5.53033009,4.46966991 L12,10.939 L18.4696699,4.46966991 C18.7625631,4.1767767 19.2374369,4.1767767 19.5303301,4.46966991 C19.8232233,4.76256313 19.8232233,5.23743687 19.5303301,5.53033009 L13.061,12 L19.5303301,18.4696699 C19.7965966,18.7359365 19.8208027,19.1526002 19.6029482,19.4462117 L19.5303301,19.5303301 C19.2640635,19.7965966 18.8473998,19.8208027 18.5537883,19.6029482 L18.4696699,19.5303301 L12,13.061 L5.53033009,19.5303301 C5.23743687,19.8232233 4.76256313,19.8232233 4.46966991,19.5303301 C4.1767767,19.2374369 4.1767767,18.7625631 4.46966991,18.4696699 L10.939,12 L4.46966991,5.53033009 C4.20340335,5.26406352 4.1791973,4.84739984 4.39705176,4.55378835 L4.46966991,4.46966991 L4.39705176,4.55378835 Z" id="🎨-Color"></path>
                            </g>
                        </g>
                    </svg>
                `
            case "circle":
                return `
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="#212121"/>
                    </svg>
                    `
            case "square":
                return `
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 5.75C3 4.23122 4.23122 3 5.75 3H18.25C19.7688 3 21 4.23122 21 5.75V18.25C21 19.7688 19.7688 21 18.25 21H5.75C4.23122 21 3 19.7688 3 18.25V5.75ZM5.75 4.5C5.05964 4.5 4.5 5.05964 4.5 5.75V18.25C4.5 18.9404 5.05964 19.5 5.75 19.5H18.25C18.9404 19.5 19.5 18.9404 19.5 18.25V5.75C19.5 5.05964 18.9404 4.5 18.25 4.5H5.75Z" fill="#212121"/>
                    </svg>
                    `
            case "line":
                return `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.47968 5.39618L17.3713 19.568C17.6375 19.8853 18.1106 19.9267 18.4279 19.6604C18.7452 19.3942 18.7866 18.9211 18.5203 18.6038L6.62875 4.432C6.3625 4.11469 5.88943 4.0733 5.57212 4.33956C5.25482 4.60581 5.21343 5.07887 5.47968 5.39618Z" fill="#212121"/>
                    </svg>
                    `
            case "text":
                return `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.76084 3.00008C9.07444 3.00452 9.35215 3.20362 9.45705 3.49919L14.957 18.9992C15.0955 19.3896 14.8913 19.8183 14.501 19.9568C14.1106 20.0953 13.6819 19.8912 13.5433 19.5008L12.1237 15.5H5.00605L3.44965 19.5207C3.30015 19.907 2.86575 20.099 2.47945 19.9494C2.09318 19.7999 1.90125 19.3655 2.05078 18.9793L8.05075 3.47925C8.16395 3.18678 8.44724 2.99563 8.76084 3.00008ZM8.71965 5.90659L5.58665 14H11.5914L8.71965 5.90659Z" fill="#212121"/>
                        <path d="M19.0001 10.5014L19.2873 10.5113C21.2478 10.6088 22.4147 11.7373 22.4955 13.5555L22.5 13.7604V19.2604C22.5 19.6401 22.2179 19.9539 21.8518 20.0035L21.75 20.0104C21.3703 20.0104 21.0565 19.7282 21.0068 19.3621L21 19.2604L20.9987 19.156C20.0111 19.7214 19.0975 20.0104 18.25 20.0104C16.4116 20.0104 15 18.7159 15 16.7604C15 15.036 16.1884 13.7549 18.1597 13.5158C19.092 13.4028 20.0395 13.4736 20.9985 13.7255C20.9887 12.6184 20.4425 12.0706 19.2127 12.0095C18.2505 11.9616 17.5743 12.0967 17.1783 12.3744C16.8391 12.6123 16.3714 12.5301 16.1336 12.191C15.8958 11.8518 15.9779 11.3841 16.317 11.1463C16.9748 10.685 17.8707 10.4807 19.0001 10.5014ZM20.999 15.3241L20.6961 15.2338C19.8887 15.0117 19.1048 14.9486 18.3403 15.0413C17.1079 15.1908 16.5 15.8461 16.5 16.7967C16.5 17.8934 17.2124 18.5467 18.25 18.5467C18.9303 18.5467 19.7685 18.2324 20.7513 17.583L20.999 17.4141V15.3241Z" fill="#212121"/>
                    </svg>
                    `
            case "image":
                return `
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.9247 2.50305C14.7225 2.50305 15.4607 2.92552 15.8647 3.61342L16.6793 5H18.75C20.5449 5 22 6.45507 22 8.25V17.75C22 19.5449 20.5449 21 18.75 21H5.25C3.45507 21 2 19.5449 2 17.75V8.25C2 6.45507 3.45507 5 5.25 5H7.33042L8.205 3.5757C8.61425 2.9092 9.34026 2.50305 10.1224 2.50305H13.9247ZM13.9247 4.00305H10.1224C9.89892 4.00305 9.6892 4.10251 9.54793 4.27084L9.48325 4.3606L8.38913 6.14245C8.25271 6.36462 8.01071 6.5 7.75 6.5H5.25C4.2835 6.5 3.5 7.2835 3.5 8.25V17.75C3.5 18.7165 4.2835 19.5 5.25 19.5H18.75C19.7165 19.5 20.5 18.7165 20.5 17.75V8.25C20.5 7.2835 19.7165 6.5 18.75 6.5H16.25C15.9841 6.5 15.738 6.35918 15.6033 6.12988L14.5714 4.37317C14.4367 4.14387 14.1906 4.00305 13.9247 4.00305ZM12 8C14.4853 8 16.5 10.0147 16.5 12.5C16.5 14.9853 14.4853 17 12 17C9.51472 17 7.5 14.9853 7.5 12.5C7.5 10.0147 9.51472 8 12 8ZM12 9.5C10.3431 9.5 9 10.8431 9 12.5C9 14.1569 10.3431 15.5 12 15.5C13.6569 15.5 15 14.1569 15 12.5C15 10.8431 13.6569 9.5 12 9.5Z" fill="#212121"/>
                    </svg>
                    `
            case "cursor":
                return `
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 3.48349C5.5 2.23523 6.93571 1.5331 7.92098 2.29951L21.4353 12.8119C22.5626 13.6887 21.9425 15.4958 20.5143 15.4958H13.6619C13.1574 15.4958 12.6806 15.7267 12.3676 16.1224L8.17661 21.4226C7.2945 22.5382 5.5 21.9145 5.5 20.4923L5.5 3.48349ZM20.5143 13.9958L7 3.48349L7 20.4923L11.191 15.192C11.7884 14.4365 12.6987 13.9958 13.6619 13.9958H20.5143Z" fill="#212121"/>
                    </svg>
                    `
            default:
                return ""
        }
    }

    readonly stylesheet = `
        button {
            position: relative;
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
        
        ${this.tooltip ? `
            button:hover::after {
                content: "${this.tooltip}";
                position: absolute;
                left: 50%;
                bottom: -32px;
                width: auto;
                padding: 4px 8px;
                background: #222222;
                border-radius: 4px;
                white-space: nowrap;
                transform: translateX(-50%);
        }` : ""}
        
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
