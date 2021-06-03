import { objectOptionEmitter } from "../../../emitter"

export default class Base extends HTMLElement {
    constructor() {
        super()
    }

    handleBlur(shadow: ShadowRoot): void {
        objectOptionEmitter.on("blur", () => {
            const inputs = shadow.querySelectorAll("input")
            inputs.forEach((input) => {
                input.blur()
            })
        })
    }

    createObserver = <T extends IOptionClass>(whichOption: T): IObserverFunction => {
        return (event: Event) => {
            const target = event.target as HTMLInputElement
            if (target.type === "checkbox") {
                whichOption.setOption({ ...whichOption.option, [target.dataset.option]: target.checked })
            } else if (target.type === "number") {
                whichOption.setOption({
                    ...whichOption.option,
                    [target.dataset.option]: Number(target.value)
                })
            } else {
                whichOption.setOption({ ...whichOption.option, [target.dataset.option]: target.value })
            }
        }
    }

    readonly stylesheet = `
        <style>
            section {
                width: 100%;
                height: 40px;
                padding: 8px 18px;
                display: flex;
                align-items: center;
                color: #000000;
                background: #f5f5f5;
                border-top: solid 1px #f5f5f5;
                border-bottom: solid 1px #eeeeee;
                box-sizing: border-box;
                gap: 16px;
                overflow-y: hidden;
            }
            
            div {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            h1 {
                padding: 0 16px 0 0;
                border-right: solid 1px #e0e0e0;
                font-size: 0.75rem;
                font-weight: bold;
                user-select: none;
            }
            
            p {
                margin: 0;
                font-size: 0.75rem;
            }
            
            p.status {
                font-size: 0.625rem;
                margin: 0 4px;
                padding: 4px 8px;
                border: solid 1px #eeeeee;
                border-radius: 4px;
                color: rgba(0, 0, 0, 0.8);
                background: #eeeeee;
            }
            
            p.status.red {
                background: #ffcdd2;
            }
            
            p.status.green {
                background: #c8e6c9;
            }
            
            p.status.blue {
                background: #bbdefb;
            }
            
            button {
                padding: 4px 8px;
                font-size: 0.75rem;
                border: solid 1px #e0e0e0;
                border-radius: 4px;
                background: #eeeeee;
                cursor: pointer;
            }
            
            button.danger {
                color: #ffffff;
                background: #e81123;
            }
        
            label,
            form {
                display: flex;
                align-items: center;
                gap: 12px;
                font-size: 0.75rem;
                white-space: nowrap;
                user-select: none;
            }
            
            input {
                width: 48px;
                height: 24px;
                padding: 0 8px;
                border: solid 1px #eeeeee;
                border-radius: 4px;
                color: #000000;
                background: #ffffff;
                font-family: InterApp, sans-serif;
                font-size: 0.75rem;
                outline: none;
            }
            
            input.hide {
                display: none;
                visibility: hidden;
                cursor: not-allowed;
            }
            
            input:disabled {
                color: #616161;
                cursor: not-allowed;
            }
            
            input[type="text"] {
                width: 150px;
                height: 24px;
            }
            
            input[type="color"] {
                width: 28px;
                height: 24px;
                padding: 0 3px;
            }
            
            input[type="checkbox"] {
                width: 0.75rem;
                height: 0.75rem;
            }
        </style>
    `
}
