import { io, Socket } from "socket.io-client"

const startClient = (path: string): Socket => {
    const arr = path.split(":")
    const port = Number(arr[arr.length - 1])

    if (!port) {
        throw new Error("端口无法识别")
    }

    const socket = io(path)

    // 首次连接之后发送 hi 消息
    socket.emit("hi", (res: { status: string }) => {
        if (res.status !== "ok") {
            throw new Error("客户端连接失败")
        }
        console.log("[Client] 客户端连接成功", path)
    })

    return socket
}

export { startClient }
