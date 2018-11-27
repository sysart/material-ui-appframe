import * as React from "react"

import {
	BottomNavigationAction,
	Icon,
	IconButton,
	List
} from "@material-ui/core"
import {
	AppFrame,
	BottomNavigation,
	MainContent,
	Navigation,
	NavigationLink,
	Title,
	TitleBar
} from "components"

export const TooWideThingsGrid = () => (
	<AppFrame withGridLayout>
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
		<BottomNavigation showLabels>
			<BottomNavigationAction value="/" icon={<Icon>home</Icon>} label="Item" />
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
			<BottomNavigationAction
				value="/"
				icon={<Icon>home</Icon>}
				label="Item5"
			/>
			<BottomNavigationAction
				value="/pets"
				icon={<Icon>star</Icon>}
				label="Item 6"
			/>
			<BottomNavigationAction
				value="/cards"
				icon={<Icon>timeline</Icon>}
				label="Item 7"
			/>
			<BottomNavigationAction
				value="/grid"
				icon={<Icon>people</Icon>}
				label="Item 8"
			/>
			<BottomNavigationAction
				value="/"
				icon={<Icon>home</Icon>}
				label="Item 9"
			/>
			<BottomNavigationAction
				value="/pets"
				icon={<Icon>star</Icon>}
				label="Item 10"
			/>
			<BottomNavigationAction
				value="/cards"
				icon={<Icon>timeline</Icon>}
				label="Item 11"
			/>
			<BottomNavigationAction
				value="/grid"
				icon={<Icon>people</Icon>}
				label="Item 12"
			/>
			<BottomNavigationAction
				value="/"
				icon={<Icon>home</Icon>}
				label="Item 13"
			/>
			<BottomNavigationAction
				value="/pets"
				icon={<Icon>star</Icon>}
				label="Item 14"
			/>
			<BottomNavigationAction
				value="/cards"
				icon={<Icon>timeline</Icon>}
				label="Item 15"
			/>
			<BottomNavigationAction
				value="/grid"
				icon={<Icon>people</Icon>}
				label="Item 16"
			/>
		</BottomNavigation>
	</AppFrame>
)
