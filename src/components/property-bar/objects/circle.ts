import PolygonPropertyBar from "../bases/polygon"
import { circleOption } from "../../../store"

export default class CirclePropertyBar extends PolygonPropertyBar {
    constructor() {
        super("圆", circleOption)
    }
}

window.customElements.define("circle-property-bar", CirclePropertyBar)
