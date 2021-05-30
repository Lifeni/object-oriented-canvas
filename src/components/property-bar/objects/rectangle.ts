import PolygonPropertyBar from "../bases/polygon"
import { rectangleOption } from "../../../store"

export default class RectanglePropertyBar extends PolygonPropertyBar {
    constructor() {
        super("方", rectangleOption)
    }
}

window.customElements.define("rectangle-property-bar", RectanglePropertyBar)
