interface ILineOption {
    lineWidth: number,
    lineColor: string,
}

interface IPolygonOption {
    borderWidth: number,
    borderColor: string,
    fillColor: string | null,
    noFillColor: boolean,
    isPerfectPolygon: boolean,
}
