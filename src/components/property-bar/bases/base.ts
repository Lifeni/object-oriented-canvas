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
                gap: 18px;
                overflow-y: hidden;
            }
            
            h1 {
                padding: 0 20px 0 0;
                border-right: solid 1px #e0e0e0;
                font-size: 0.75rem;
                user-select: none;
            }
            
            p {
                margin: 0 2px;
                font-size: 0.75rem;
            }
            
            p.saved-status {
                font-size: 0.625rem;
                margin: 0 -8px 0 4px;
                padding: 2px 6px;
                border: solid 1px #eeeeee;
                border-radius: 4px;
                background: #eeeeee;
            }
            
            p.saved-status.red {
                background: #ffcdd2;
            }
            
            p.saved-status.green {
                background: #C8E6C9;
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
            
            input[type="text"] {
                width: 128px;
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
