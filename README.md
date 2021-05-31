# Object-oriented Canvas

这是一个基于面向对象分析与设计的画布 App。

也是软件代码开发技术的课程设计。

## 技术

UI 方面，用 TypeScript + Electron + Web Components 实现。

数据方面，目前使用 mitt 实现事件监听，用 RxJS 实现观察者模式，计划未来全面采用 RxJS。

目前没有用前端的打包工具，仅使用 tsc 处理 TypeScript 文件。

## TODO

- [ ] 所有对象可移动和改变大小

- [ ] 将每次绘制流程储存成 JSON 格式

- [ ] 添加保存和读取绘制流程的功能

- [ ] 添加多人本地共享画布的功能

- [ ] 全面使用 RxJS

- [ ] 规范项目文件命名

## 开发

推荐安装 `electronmon` 和 `concurrently` 来运行开发环境。

```shell
# 可以安装到全局环境
yarn global add electronmon concurrently

# 启动开发环境，
# 自动监听文件改动并重启应用
yarn dev
```

注意：启动开发环境后，应用可能会报错或者自动重启一次，这是因为代码编译和运行是同时进行的，但是编译的速度比运行慢，应用在运行后可能找不到文件（还没编译完）或者运行的不是最新的代码（上一次编译的缓存），等到最新的代码编译完就可以正常运行了。

运行 `yarn build:win` 编译并打包成单文件版的 exe 文件，初次运行需要联网下载编译工具，请耐心等待。

## 开源协议

MIT License
