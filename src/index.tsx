import * as React from "react"
import * as ReactDOM from "react-dom"

import { App } from "demo/App"
import { Providers } from "demo/Providers"

ReactDOM.render(
	<Providers>
		<App />
	</Providers>,
	document.getElementById("root")
)
