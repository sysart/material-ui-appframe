import { colors, createMuiTheme, CssBaseline } from "@material-ui/core"
import { MuiThemeProvider } from "@material-ui/core/styles"
import * as React from "react"
import { Video, videos } from "./mockVideoData"

interface Props {
	children: React.ReactNode
}

interface MockVideoDataProviderProps {
	children: (response: { videos: Video[]; error: null }) => any
}

export const MockVideoDataProvider = (props: MockVideoDataProviderProps) =>
	props.children({ videos, error: null })

export const Providers = (props: Props) => (
	<MuiThemeProvider
		theme={createMuiTheme({
			palette: {
				primary: colors.deepPurple
			}
		})}
	>
		<CssBaseline />
		{props.children}
	</MuiThemeProvider>
)
