import { createServer } from "http"
import { Server, Socket } from "socket.io"

const httpServer = createServer()

const startServer = (path: string): void => {
    const arr = path.split(":")
    const port = Number(arr[arr.length - 1])

    if (!port) {
        throw new Error("端口无法识别")
    }

    const io = new Server(httpServer, {
        // 发送数据的最大值，要发送图片的话，需要把这个调的大一点
        // 现在是 100MB
        maxHttpBufferSize: 1e8
    })

    // 连接后进行监听
    io.on("connection", (socket: Socket) => {
        // 监听客户端的连接
        socket.on("hi", (callback) => {
            console.log("[Server] 客户端已接入", path)
            callback({
                status: "ok"
            })
        })

        // 广播（转发）某一个客户端的操作到其他客户端
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
