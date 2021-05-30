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
                position: absolute;
                left: 0;
                top: 48px;
                width: 100%;
                height: 40px;
                padding: 8px 18px;
                display: flex;
                align-items: center;
                color: #fff;
                background: #2c2c2c;
                box-sizing: border-box;
                gap: 18px;
                animation: show-bar 0.2s;
                overflow-y: hidden;
            }
            
            h1 {
                padding: 0 20px 0 0;
                border-right: solid 1px rgba(255, 255, 255, 0.1);
                font-size: 0.75rem;
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
                border: none;
                border-radius: 4px;
                color: #fff;
                background: rgba(255, 255, 255, 0.05);
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
            
            @keyframes show-bar {
                from {
                    padding: 0 18px;
                    height: 0;
                }
                
                to {
                    padding: 8px 18px;
                    height: 40px;
                }
            }
        </style>
    `
}