import * as React from "react"

import { colors, createMuiTheme, CssBaseline } from "@material-ui/core"
import { MuiThemeProvider } from "@material-ui/core/styles"
import { MockMailService } from "components/MockMailService"

interface Props {
	children: React.ReactNode
}

export const Providers = (props: Props) => (
	<MuiThemeProvider
		theme={createMuiTheme({
			typography: {
				useNextVariants: true
			},
			palette: { primary: colors.red, secondary: colors.blue }
		})}
	>
		<MockMailService>
			<CssBaseline />
			{props.children}
		</MockMailService>
	</MuiThemeProvider>
)
