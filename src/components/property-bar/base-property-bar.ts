export default class BasePropertyBar extends HTMLElement {
    readonly stylesheet = `
        <style>
            section {
                position: absolute;
                left: 0;
                top: 48px;
                width: 100%;
                height: 48px;
                padding: 10px 20px;
                display: flex;
                align-items: center;
                color: #fff;
                background: #2c2c2c;
                box-sizing: border-box;
                gap: 20px;
            }
            
            h1 {
                padding: 0 20px 0 0;
                border-right: solid 1px rgba(255, 255, 255, 0.1);
                font-size: 0.875rem;
            }
        
            label,
            form {
                display: flex;
                align-items: center;
                gap: 12px;
                font-size: 0.875rem;
                white-space: nowrap;
            }
            
            input {
                width: 48px;
                height: 28px;
                padding: 0 8px;
                border: none;
                border-radius: 4px;
                color: #fff;
                background: rgba(255, 255, 255, 0.05);
                font-family: InterApp, sans-serif;
                outline: none;
            }
            
            input:disabled {
                cursor: not-allowed;
            }
            
            input[type="text"] {
                width: 128px;
                height: 28px;
            }
            
            input[type="color"] {
                width: 28px;
                height: 28px;
            }
            
            input[type="checkbox"] {
                width: 16px;
                height: 16px;
            }
        </style>
    `
}

window.customElements.define("property-bar", BasePropertyBar)
