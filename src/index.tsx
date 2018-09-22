import * as React from "react"

import * as ReactDOM from "react-dom"
import * as Layouts from "./test_layouts"

/**
 * For testing purposes, this demo app allows replacing the entire layout.
 *
 * A more conventional index.tsx file would contain something like the following:
 *
 * ReactDOM.render(<Providers><App/></Providers>, document.getElementById("root"))
 *
 * For complete examples on Material UI Applications, see the examples directory.
 */

const rootElement = document.getElementById("root")

ReactDOM.render(React.createElement(Layouts.DemoLayout), rootElement)

const win = window as any
win.renderLayout = (name: string) => {
	ReactDOM.render(React.createElement(Layouts[name]), rootElement)
}
win.layouts = Layouts
