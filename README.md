# Object-oriented Canvas

这是一个基于面向对象分析与设计的画布 App。

也是软件代码开发技术的课程设计。

## 技术

UI 方面，用 TypeScript + Electron + Web Components 实现。

数据方面，用 mitt 实现事件监听，用 RxJS 实现观察者模式。

目前没有用前端的打包工具，仅使用 tsc 处理 TypeScript 文件。

## 开发

推荐安装 `electronmon` 和 `concurrently` 来运行开发环境。

```shell
# 可以安装到全局环境
yarn global add electronmon concurrently

# 启动开发环境，
# 自动监听文件改动并重启应用
yarn dev
```

注意：启动开发环境后，应用可能会自动重启一次，这是正常的。

运行 `yarn build:win` 编译并打包成单文件版的 exe 文件，初次运行需要联网下载编译工具，请耐心等待。

## 开源协议

MIT License
