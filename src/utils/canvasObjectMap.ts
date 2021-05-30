import Rectangle from "../objects/Rectangle"
import Circle from "../objects/Circle"
import Line from "../objects/Line"
import Text from "../objects/Text"
import { v4 as uuidv4 } from 'uuid';

type CanvasObjects = Rectangle | Circle | Line | Text | null

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
        case "text": {
            return new Text(ctx, uuidv4())
        }
        default: {
            return null
        }
    }
}

export { canvasObjectMap, CanvasObjects }
