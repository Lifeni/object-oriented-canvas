type CanvasObjects =
    "circle" | "rectangle" | "line" | "text" | "image"

interface IBaseObject {
    id: string
    name: CanvasObjects
    x: number
    y: number
    ex: number
    ey: number
}

interface ILineObject extends IBaseObject {
    option: ILineOption
}

interface ITextObject extends IBaseObject {
    data: string
    option: ITextOption
}

interface IShapeObject extends IBaseObject {
    option: IShapeOption
}

interface IImageObject extends IBaseObject {
    data: string
}

type CircleObjectType = IShapeObject

type RectangleObjectType = IShapeObject

type LineObjectType = ILineObject

type TextObjectType = ITextObject

type ImageObjectType = IImageObject

type CanvasHistoryType = CircleObjectType | RectangleObjectType | LineObjectType | TextObjectType | ImageObjectType

interface IShapeOption {
    borderWidth: number,
    borderColor: string,
    fillColor: string | null,
    noFillColor: boolean,
    isPerfectShape: boolean,
}

interface ILineOption {
    lineWidth: number,
    lineColor: string,
}

interface ITextOption {
    fontSize: number,
    fontFamily: string,
    fontColor: string,
    isBold: boolean,
    isItalic: boolean
}

interface ISetOption {
    (option: IShapeOption | ILineOption | ITextOption): void
}

interface IOptionClass {
    option: IShapeOption | ILineOption | ITextOption
    setOption: ISetOption
}

interface IObserverFunction {
    (event: Event): void
}

interface IImportImageData {
    name: string
    data: string
    id: string
}

type IPCExportImageType = "png" | "jpeg" | "webp"

type IPCExportImageProps = { data: string, type: IPCExportImageType }

type IPCOpenFileProps = { file: Array<CanvasHistoryType>, name: string, id: string }

type IPCSaveFileType = "save" | "save-as"

type IPCSaveFileProps = { data: Array<CanvasHistoryType>, type: IPCSaveFileType }
