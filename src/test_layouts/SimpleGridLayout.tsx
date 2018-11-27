import * as React from "react"

import {
	BottomNavigationAction,
	Card,
	CardContent,
	CardHeader,
	Icon,
	Typography
} from "@material-ui/core"
import {
	AppFrame,
	BottomNavigation,
	MainContent,
	Title,
	TitleBar
} from "components"

import { createMuiTheme } from "@material-ui/core"
import * as colors from "@material-ui/core/colors"
import { MuiThemeProvider } from "@material-ui/core/styles"

export const SimpleGridLayout = () => (
	<Providers>
		<AppFrame withGridLayout>
			<TitleBar>
				<Title>Simple layout</Title>
			</TitleBar>
			<MainContent>
				<Card>
					<CardHeader title="Sample card" />
					<CardContent>
						<Typography>Sample text</Typography>
					</CardContent>
				</Card>
			</MainContent>
			<BottomNavigation showLabels>
				<BottomNavigationAction
					value="/"
					icon={<Icon>home</Icon>}
					label="Item"
				/>
				<BottomNavigationAction
					value="/pets"
					icon={<Icon>star</Icon>}
					label="Item 2"
				/>
				<BottomNavigationAction
					value="/cards"
					icon={<Icon>timeline</Icon>}
					label="Item 3"
				/>
				<BottomNavigationAction
					value="/grid"
					icon={<Icon>people</Icon>}
					label="Item 4"
				/>
			</BottomNavigation>
		</AppFrame>
	</Providers>
)

const Providers = (props: { children: React.ReactNode }) => (
	<MuiThemeProvider
		theme={createMuiTheme({
			palette: { primary: colors.yellow, type: "dark" }
		})}
	>
		{props.children}
	</MuiThemeProvider>
)
