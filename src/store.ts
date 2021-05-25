class CanvasToolStore {
    public tool = "cursor"

    setTool(tool: string): void {
        this.tool = tool
    }

    setDefault() {
        this.tool = "cursor"
    }
}

class CanvasHistoryStore {
    public history: Array<ImageData> = []

    push(data: ImageData): void {
        this.history.push(data)
    }

    last(): ImageData {
        return this.history[this.history.length - 1]
    }

}

export const canvasTool = new CanvasToolStore()
export const canvasHistory = new CanvasHistoryStore()
