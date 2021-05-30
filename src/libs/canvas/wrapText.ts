// 对 Canvas 绘制文字添加自动换行
// https://www.zhangxinxu.com/wordpress/2018/02/canvas-text-break-line-letter-spacing-vertical/

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
CanvasRenderingContext2D.prototype.wrapText = function (text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
    if (typeof text != "string" || typeof x != "number" || typeof y != "number") {
        return
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this
    const canvas = context.canvas

    if (typeof maxWidth == "undefined") {
        maxWidth = (canvas && canvas.width) || 300
    }
    if (typeof lineHeight == "undefined") {
        lineHeight = (canvas && parseInt(window.getComputedStyle(canvas).lineHeight)) || parseInt(window.getComputedStyle(document.body).lineHeight)
    }

    // 字符分隔为数组
    const arrText = text.split("")
    let line = ""

    for (let n = 0; n < arrText.length; n++) {
        const testLine = line + arrText[n]
        const metrics = context.measureText(testLine)
        const testWidth = metrics.width
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y)
            line = arrText[n]
            y += lineHeight
        } else {
            line = testLine
        }
    }
    context.fillText(line, x, y)
}

