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

    import("./components/canvas/image-preview")
    import("./components/canvas/main-canvas")
    import("./components/canvas/text-input")

    import("./components/property-bar/bases/base")
    import("./components/property-bar/property-bar")

    import("./components/property-bar/objects/circle")
    import("./components/property-bar/objects/line")
    import("./components/property-bar/objects/text")
    import("./components/property-bar/objects/rectangle")

    import("./libs/index")
})
