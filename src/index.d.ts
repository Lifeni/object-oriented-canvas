interface IPolygonOption {
    borderWidth: number,
    borderColor: string,
    fillColor: string | null,
    noFillColor: boolean,
    isPerfectPolygon: boolean,
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
    (option: IPolygonOption | ILineOption | ITextOption): void
}

interface IOptionClass {
    option: IPolygonOption | ILineOption | ITextOption
    setOption: ISetOption
}

interface IObserverFunction {
    (event: Event): void
}
