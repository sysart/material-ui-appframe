import { Providers } from "Providers"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { App } from "./App"
import registerServiceWorker from "./registerServiceWorker"

ReactDOM.render(
	<Providers>
		<App />
	</Providers>,
	document.getElementById("root") as HTMLElement
)
registerServiceWorker()
