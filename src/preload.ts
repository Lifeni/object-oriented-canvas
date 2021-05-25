window.addEventListener("DOMContentLoaded", () => {
    console.log("Hello, Electron!")

    import("./components/action-bar/action-bar")
    import("./components/action-bar/base-button")

    import("./components/action-bar/app-actions/action-button")

    import("./components/action-bar/app-menu/app-menu")
    import("./components/action-bar/app-menu/menu-button")
    import("./components/action-bar/app-menu/menu-item")

    import("./components/action-bar/canvas-tools/canvas-tools")
    import("./components/action-bar/canvas-tools/tool-button")

    import("./components/canvas/main-canvas")
})
