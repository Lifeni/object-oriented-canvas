import Circle from "../objects/Circle"
import Line from "../objects/Line"
import Rectangle from "../objects/Rectangle"
import Text from "../objects/Text"
import { v4 as uuidv4 } from "uuid"
import ImageObject from "../objects/Image"

type CanvasVectorObjects = Circle | Rectangle | Line | Text | null
type CanvasBinaryObjects = ImageObject | null
type CanvasObjects = CanvasVectorObjects | CanvasBinaryObjects

const canvasObjectMap = (name: string, ctx: CanvasRenderingContext2D, data?: IImportImageData): CanvasObjects => {
    switch (name) {
        case "circle": {
            return new Circle(ctx)
        }
        case "rectangle": {
            return new Rectangle(ctx)
        }
        case "line": {
            return new Line(ctx)
        }
        case "text": {
            return new Text(ctx, uuidv4())
        }
        case "image": {
            return new ImageObject(ctx, uuidv4(), data)
        }
        default: {
            return null
        }
    }
}

export {
    canvasObjectMap,
    CanvasObjects,
    CanvasVectorObjects,
    CanvasBinaryObjects
}
