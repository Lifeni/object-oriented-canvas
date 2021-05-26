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
    public history: ImageData

    set(data: ImageData): void {
        this.history = data
    }

    get(): ImageData {
        return this.history
    }

}

export const canvasTool = new CanvasToolStore()
export const canvasHistory = new CanvasHistoryStore()
