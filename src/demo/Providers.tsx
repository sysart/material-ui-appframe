import * as React from "react"

import { createMuiTheme, CssBaseline } from "@material-ui/core"
import { MuiThemeProvider } from "@material-ui/core/styles"

import * as colors from "@material-ui/core/colors"
import { ThemeOptionsProvider, WithThemeOptions } from "./ThemeOptionsProvider"

interface Props {
	children: React.ReactNode
}

export const Providers = (props: Props) => (
	<ThemeOptionsProvider>
		<WithThemeOptions>
			{({ primaryColor, secondaryColor, rightToLeft, darkMode }) => (
				<MuiThemeProvider
					theme={createMuiTheme({
						typography: {
							useNextVariants: true
						},
						palette: {
							primary: colors[primaryColor],
							secondary: colors[secondaryColor],
							type: darkMode ? "dark" : "light"
						},
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
