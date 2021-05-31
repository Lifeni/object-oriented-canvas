import ShapePropertyBar from "../bases/shape"
import { circleOption } from "../../../store"

export default class CirclePropertyBar extends ShapePropertyBar {
    constructor() {
        super("圆", circleOption)
    }
}

window.customElements.define("circle-property-bar", CirclePropertyBar)
