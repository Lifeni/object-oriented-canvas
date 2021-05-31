import ShapePropertyBar from "../bases/shape"
import { rectangleOption } from "../../../store"

export default class RectanglePropertyBar extends ShapePropertyBar {
    constructor() {
        super("方", rectangleOption)
    }
}

window.customElements.define("rectangle-property-bar", RectanglePropertyBar)
