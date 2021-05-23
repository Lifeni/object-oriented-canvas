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
            case "circle":
                return `
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="#212121"/>
                    </svg>
                    `
            case "square":
                return `
                    <svg   viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 5.75C3 4.23122 4.23122 3 5.75 3H18.25C19.7688 3 21 4.23122 21 5.75V18.25C21 19.7688 19.7688 21 18.25 21H5.75C4.23122 21 3 19.7688 3 18.25V5.75ZM5.75 4.5C5.05964 4.5 4.5 5.05964 4.5 5.75V18.25C4.5 18.9404 5.05964 19.5 5.75 19.5H18.25C18.9404 19.5 19.5 18.9404 19.5 18.25V5.75C19.5 5.05964 18.9404 4.5 18.25 4.5H5.75Z" fill="#212121"/>
                    </svg>
                    `
            case "line":
                return `
                    <svg   viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="ic_fluent_list_24_regular" fill="#212121" fill-rule="nonzero">
                                <path d="M2.75,18 L15.25,18 C15.6642136,18 16,18.3357864 16,18.75 C16,19.1296958 15.7178461,19.443491 15.3517706,19.4931534 L15.25,19.5 L2.75,19.5 C2.33578644,19.5 2,19.1642136 2,18.75 C2,18.3703042 2.28215388,18.056509 2.64822944,18.0068466 L2.75,18 L15.25,18 L2.75,18 Z M2.75,11.5 L21.25,11.5 C21.6642136,11.5 22,11.8357864 22,12.25 C22,12.6296958 21.7178461,12.943491 21.3517706,12.9931534 L21.25,13 L2.75,13 C2.33578644,13 2,12.6642136 2,12.25 C2,11.8703042 2.28215388,11.556509 2.64822944,11.5068466 L2.75,11.5 L21.25,11.5 L2.75,11.5 Z M2.75,5.0032392 L18.25,5.0032392 C18.6642136,5.0032392 19,5.33902564 19,5.7532392 C19,6.13293497 18.7178461,6.44673016 18.3517706,6.49639258 L18.25,6.5032392 L2.75,6.5032392 C2.33578644,6.5032392 2,6.16745276 2,5.7532392 C2,5.37354343 2.28215388,5.05974824 2.64822944,5.01008582 L2.75,5.0032392 L18.25,5.0032392 L2.75,5.0032392 Z" id="🎨-Color"></path>
                            </g>
                        </g>
                    </svg>
                    `
            case "text":
                return `
                    <svg   viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="ic_fluent_convert_to_text_24_regular" fill="#212121" fill-rule="nonzero">
                                <path d="M2.74694234,15 C3.1266381,15 3.4404333,15.2821539 3.49009572,15.6482294 L3.49694234,15.75 L3.49694234,19.2523354 L3.50339594,19.3801406 C3.56314094,19.9684394 4.03083834,20.4361368 4.6191371,20.4958818 L4.74694234,20.5023354 L8.24694234,20.5023354 L8.34871289,20.509182 C8.71478845,20.5588444 8.99694234,20.8726396 8.99694234,21.2523354 C8.99694234,21.6320311 8.71478845,21.9458263 8.34871289,21.9954888 L8.24694234,22.0023354 L4.74694234,22.0023354 L4.57942,21.9973166 C3.19627785,21.9142027 2.08875721,20.8087621 2.00236859,19.4265053 L1.99694234,19.2523354 L1.99694234,15.75 L2.00378895,15.6482294 C2.05345137,15.2821539 2.36724657,15 2.74694234,15 Z M21.2469423,15 C21.6266381,15 21.9404333,15.2821539 21.9900957,15.6482294 L21.9969423,15.75 L21.9969423,19.2523354 C21.9969423,20.7148672 20.8552377,21.9107397 19.4144647,21.9973166 L19.2469423,22.0023354 L15.7469423,22.0023354 C15.3327288,22.0023354 14.9969423,21.6665489 14.9969423,21.2523354 C14.9969423,20.8726396 15.2790962,20.5588444 15.6451718,20.509182 L15.7469423,20.5023354 L19.2469423,20.5023354 C19.894151,20.5023354 20.4264762,20.0104607 20.4904887,19.3801406 L20.4969423,19.2523354 L20.4969423,15.75 C20.4969423,15.3357864 20.8327288,15 21.2469423,15 Z M12.2549721,15.5 C12.6691857,15.5 13.0049721,15.8357864 13.0049721,16.25 C13.0049721,16.6296958 12.7228182,16.943491 12.3567426,16.9931534 L12.2549721,17 L7.75,17 C7.33578644,17 7,16.6642136 7,16.25 C7,15.8703042 7.28215388,15.556509 7.64822944,15.5068466 L7.75,15.5 L12.2549721,15.5 Z M16.25,11.25 C16.6642136,11.25 17,11.5857864 17,12 C17,12.3796958 16.7178461,12.693491 16.3517706,12.7431534 L16.25,12.75 L7.75,12.75 C7.33578644,12.75 7,12.4142136 7,12 C7,11.6203042 7.28215388,11.306509 7.64822944,11.2568466 L7.75,11.25 L16.25,11.25 Z M8.24694234,2 C8.6611559,2 8.99694234,2.33578644 8.99694234,2.75 C8.99694234,3.12969577 8.71478845,3.44349096 8.34871289,3.49315338 L8.24694234,3.5 L4.74694234,3.5 C4.09973364,3.5 3.56740844,3.99187466 3.50339594,4.62219476 L3.49694234,4.75 L3.49694234,8.25233538 C3.49694234,8.66654894 3.1611559,9.00233538 2.74694234,9.00233538 C2.36724657,9.00233538 2.05345137,8.7201815 2.00378895,8.35410594 L1.99694234,8.25233538 L1.99694234,4.75 C1.99694234,3.28746816 3.13864693,2.09159572 4.57942,2.00501879 L4.74694234,2 L8.24694234,2 Z M19.2469423,2 L19.4144647,2.00501879 C20.7976068,2.08813264 21.9051275,3.19357324 21.9915161,4.57583007 L21.9969423,4.75 L21.9969423,8.25233538 L21.9900957,8.35410594 C21.9404333,8.7201815 21.6266381,9.00233538 21.2469423,9.00233538 C20.8672466,9.00233538 20.5534514,8.7201815 20.503789,8.35410594 L20.4969423,8.25233538 L20.4969423,4.75 L20.4904887,4.62219476 C20.4307437,4.033896 19.9630463,3.5661986 19.3747476,3.50645361 L19.2469423,3.5 L15.7469423,3.5 L15.6451718,3.49315338 C15.2790962,3.44349096 14.9969423,3.12969577 14.9969423,2.75 C14.9969423,2.37030423 15.2790962,2.05650904 15.6451718,2.00684662 L15.7469423,2 L19.2469423,2 Z M16.25,7 C16.6642136,7 17,7.33578644 17,7.75 C17,8.12969577 16.7178461,8.44349096 16.3517706,8.49315338 L16.25,8.5 L7.75,8.5 C7.33578644,8.5 7,8.16421356 7,7.75 C7,7.37030423 7.28215388,7.05650904 7.64822944,7.00684662 L7.75,7 L16.25,7 Z" id="🎨-Color"></path>
                            </g>
                        </g>
                    </svg>
                    `
            case "image":
                return `
                    <svg   viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="ic_fluent_wallpaper_24_regular" fill="#212121" fill-rule="nonzero">
                                <path d="M14.5000404,13.4435501 L14.6547081,13.5898226 L20.4832138,19.4565177 L20.4935464,19.3789729 L20.5,19.2511677 L20.5,13.7488323 C20.5,13.3346187 20.8357864,12.9988323 21.25,12.9988323 C21.6296958,12.9988323 21.943491,13.2809862 21.9931534,13.6470618 L22,13.7488323 L22,19.2511677 C22,20.7136995 20.8582954,21.909572 19.4175223,21.9961489 L19.25,22.0011677 L13.75,22.0011677 C13.3357864,22.0011677 13,21.6653813 13,21.2511677 C13,20.8714719 13.2821539,20.5576767 13.6482294,20.5080143 L13.75,20.5011677 L19.25,20.5011677 C19.2994106,20.5011677 19.3481515,20.4983008 19.3960656,20.4927244 L13.5940479,14.6504827 C12.7572102,13.813645 11.4251873,13.7737956 10.5411891,14.5309345 L10.4120674,14.6504827 L4.54564726,20.4845459 L4.62219476,20.4947141 L4.75,20.5011677 L10.25,20.5011677 L10.3517706,20.5080143 C10.7178461,20.5576767 11,20.8714719 11,21.2511677 C11,21.6308635 10.7178461,21.9446587 10.3517706,21.9943211 L10.25,22.0011677 L4.75,22.0011677 L4.58247767,21.9961489 C3.19933552,21.913035 2.09181488,20.8075944 2.00542625,19.4253376 L2,19.2511677 L2,13.7488323 L2.00684662,13.6470618 C2.05650904,13.2809862 2.37030423,12.9988323 2.75,12.9988323 C3.12969577,12.9988323 3.44349096,13.2809862 3.49315338,13.6470618 L3.5,13.7488323 L3.5,19.2511677 L3.509,19.3978323 L9.35140724,13.5898226 C10.7653745,12.1758553 13.0275744,12.1270978 14.5000404,13.4435501 Z M16.0235362,6.01178049 C17.1319192,6.01178049 18.0304412,6.91030249 18.0304412,8.01868554 C18.0304412,9.1270686 17.1319192,10.0255906 16.0235362,10.0255906 C14.9151531,10.0255906 14.0166311,9.1270686 14.0166311,8.01868554 C14.0166311,6.91030249 14.9151531,6.01178049 16.0235362,6.01178049 Z M10.25,1.99883231 C10.6642136,1.99883231 11,2.33461875 11,2.74883231 C11,3.12852808 10.7178461,3.44232327 10.3517706,3.49198569 L10.25,3.49883231 L4.75,3.49883231 C4.10279131,3.49883231 3.5704661,3.99070698 3.50645361,4.62102707 L3.5,4.74883231 L3.5,10.2511677 C3.5,10.6653813 3.16421356,11.0011677 2.75,11.0011677 C2.37030423,11.0011677 2.05650904,10.7190138 2.00684662,10.3529382 L2,10.2511677 L2,4.74883231 C2,3.28630047 3.1417046,2.09042803 4.58247767,2.0038511 L4.75,1.99883231 L10.25,1.99883231 Z M19.25,1.99883231 L19.4175223,2.0038511 C20.8006645,2.08696495 21.9081851,3.19240555 21.9945737,4.57466238 L22,4.74883231 L22,10.2511677 L21.9931534,10.3529382 C21.943491,10.7190138 21.6296958,11.0011677 21.25,11.0011677 C20.8703042,11.0011677 20.556509,10.7190138 20.5068466,10.3529382 L20.5,10.2511677 L20.5,4.74883231 L20.4935464,4.62102707 C20.4338014,4.03272831 19.966104,3.56503091 19.3778052,3.50528592 L19.25,3.49883231 L13.75,3.49883231 L13.6482294,3.49198569 C13.2821539,3.44232327 13,3.12852808 13,2.74883231 C13,2.36913655 13.2821539,2.05534135 13.6482294,2.00567893 L13.75,1.99883231 L19.25,1.99883231 Z M16.0235362,7.51178049 C15.7435802,7.51178049 15.5166311,7.73872961 15.5166311,8.01868554 C15.5166311,8.29864147 15.7435802,8.5255906 16.0235362,8.5255906 C16.3034921,8.5255906 16.5304412,8.29864147 16.5304412,8.01868554 C16.5304412,7.73872961 16.3034921,7.51178049 16.0235362,7.51178049 Z" id="🎨-Color"></path>
                            </g>
                        </g>
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
                background: #222222ee;
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