import Rectangle from "../objects/Rectangle"
import Circle from "../objects/Circle"
import Line from "../objects/Line"

type CanvasObjects = Rectangle | Circle | Line | null

const canvasObjectMap = (name: string, ctx: CanvasRenderingContext2D): CanvasObjects => {
    switch (name) {
        case "rectangle": {
            return new Rectangle(ctx)
        }
        case "circle": {
            return new Circle(ctx)
        }
        case "line": {
            return new Line(ctx)
        }
        default: {
            return null
        }
    }
}

export { canvasObjectMap, CanvasObjects }
