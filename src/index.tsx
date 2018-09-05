import * as ReactDOM from "react-dom"
import * as Layouts from "./test_layouts"

const rootElement = document.getElementById("root")

ReactDOM.render(Layouts.DemoLayout, rootElement)

// For testing purposes, allow replacing entire layout
const win = window as any
win.renderLayout = (name: string) => {
	ReactDOM.render(Layouts[name], rootElement)
}
win.layouts = Layouts
