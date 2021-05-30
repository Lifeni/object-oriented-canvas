import Base from "./Base"

class Vector extends Base {
    public active = false
    public x: number
    public y: number

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx)
    }

    create(x: number, y: number): void {
        this.active = true
        this.x = x
        this.y = y
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    blur(x: number, y: number): void {
        this.active = false
    }
}

export default Vector
