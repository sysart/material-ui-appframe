import * as React from "react"

import { Icon, IconButton, List } from "@material-ui/core"
import {
	AppFrame,
	MainContent,
	Navigation,
	NavigationLink,
	Title,
	TitleBar
} from "components"

export const TooWideThingsStandard = () => (
	<AppFrame>
		<TitleBar>
			<Title>
				This title is so long that it alone can make it difficult to fit
				everything in the app bar
			</Title>
			<IconButton color="inherit">
				<Icon>person</Icon>
			</IconButton>
			<IconButton color="inherit">
				<Icon>person</Icon>
			</IconButton>
			<IconButton color="inherit">
				<Icon>person</Icon>
			</IconButton>
			<IconButton color="inherit">
				<Icon>person</Icon>
			</IconButton>
			<IconButton color="inherit">
				<Icon>person</Icon>
			</IconButton>
			<IconButton color="inherit">
				<Icon>person</Icon>
			</IconButton>
			<IconButton color="inherit">
				<Icon>person</Icon>
			</IconButton>
			<IconButton color="inherit">
				<Icon>person</Icon>
			</IconButton>
			<IconButton color="inherit">
				<Icon>person</Icon>
			</IconButton>
			<IconButton color="inherit">
				<Icon>person</Icon>
			</IconButton>
			<IconButton color="inherit">
				<Icon>person</Icon>
			</IconButton>
			<IconButton color="inherit">
				<Icon>person</Icon>
			</IconButton>
		</TitleBar>
		<Navigation>
			<List>
				<NavigationLink exact to="/" icon="home">
					Home
				</NavigationLink>
				<NavigationLink to="/samples" icon="poll">
					A very very very very very very very long item
				</NavigationLink>
				<NavigationLink to="/components" icon="timeline">
					Components
					<div style={{ width: 2000 }}>
						AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
					</div>
				</NavigationLink>
				<div style={{ width: 2000 }}>
					AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
				</div>
			</List>
		</Navigation>
		<MainContent>
			<div style={{ width: 5000, backgroundColor: "green" }}>REEEE</div>
		</MainContent>
	</AppFrame>
)
