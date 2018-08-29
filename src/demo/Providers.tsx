import * as React from "react"

import { createMuiTheme, CssBaseline } from "@material-ui/core"
import { MuiThemeProvider } from "@material-ui/core/styles"

import { ThemeOptionsProvider, WithThemeOptions } from "./ThemeOptionsProvider"

interface Props {
	children: React.ReactNode
}

export const Providers = (props: Props) => (
	<ThemeOptionsProvider>
		<WithThemeOptions>
			{({ rightToLeft, darkMode }) => (
				<MuiThemeProvider
					theme={createMuiTheme({
						palette: { type: darkMode ? "dark" : "light" },
						direction: rightToLeft ? "rtl" : "ltr"
					})}
				>
					<CssBaseline />
					{props.children}
				</MuiThemeProvider>
			)}
		</WithThemeOptions>
	</ThemeOptionsProvider>
)
