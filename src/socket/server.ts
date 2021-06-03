import { createServer } from "http"
import { Server, Socket } from "socket.io"

const httpServer = createServer()

const startServer = (path: string): void => {
    const arr = path.split(":")
    const port = Number(arr[arr.length - 1])

    if (!port) {
        throw new Error("端口无法识别")
    }

    const io = new Server(httpServer)

    io.on("connection", (socket: Socket) => {
        socket.on("hi", (callback) => {
            console.log("[Server] 客户端已接入", path)
            callback({
                status: "ok"
            })
        })

        socket.on("send", (res) => {
            socket.broadcast.emit("broadcast", res)
        })
    })

    httpServer.listen(port)
}

const closeServer = (): void => {
    httpServer.close()
}

export { startServer, closeServer }
