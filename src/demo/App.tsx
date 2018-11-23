import * as React from "react"

import {
	BottomNavigationAction,
	Divider,
	Hidden,
	Icon,
	IconButton,
	List,
	ListSubheader,
	Tooltip
} from "@material-ui/core"
import {
	AppFrame,
	BottomNavigation,
	MainContent,
	Navigation,
	NavigationCollapse,
	NavigationLink,
	NavigationToggle,
	Title,
	TitleBar,
	TitleBarSearch
} from "components"
import { styled } from "components/utilities"
import { Route, Switch } from "react-router-dom"
import { Cards } from "./Cards"
import { ColorPicker } from "./ColorPicker"
import { Components } from "./Components"
import { GridDemo } from "./GridDemo"
import { Home } from "./Home"
import { NestDemo, ShowPet } from "./NestDemo"
import { Samples } from "./Samples"
import { StyledWithClassesDemo } from "./StyledWithClassesDemo"
import { WithThemeOptions } from "./ThemeOptionsProvider"

export const App = () => (
	<AppFrame>
		<TitleBar>
			<NavigationToggle />
			<StyledTitle>AppFrame Demo</StyledTitle>
			<Hidden smDown>
				<TitleBarSearch autoFocus />
			</Hidden>
			<Hidden mdUp>
				<Separator />
				<IconButton color="inherit">
					<Icon>search</Icon>
				</IconButton>
			</Hidden>
			<ColorPicker />
			<ToggleRightToLeft />
		</TitleBar>
		<Navigation>
			<List>
				<NavigationLink exact to="/" icon="home">
					Home
				</NavigationLink>
				<NavigationLink to="/samples" icon="poll">
					Samples
				</NavigationLink>
				<NavigationLink to="/components" icon="timeline">
					Components
				</NavigationLink>
			</List>
			<Divider />
			<List>
				<ListSubheader>Demo content:</ListSubheader>
				<NavigationLink to="/cards" icon="view_module">
					Scrollable content
				</NavigationLink>
				<NavigationLink to="/pets" icon="list">
					Nested hierarchy
				</NavigationLink>
				<NavigationLink to="/grid" icon="view_quilt">
					CSS3 grid demo
				</NavigationLink>
				<NavigationLink to="/styled" icon="border_color">
					Styling with classes
				</NavigationLink>
			</List>
			<List>
				<ListSubheader>Collapse menu demo:</ListSubheader>
				<NavigationCollapse icon="view_list" label="Collapse 1">
					<NavigationLink to="/c1m1" icon="photo">
						Photos
					</NavigationLink>
					<NavigationLink to="/c1m2" icon="theaters">
						Videos
					</NavigationLink>
					<NavigationLink to="/c1m3" icon="library_music">
						Music
					</NavigationLink>
				</NavigationCollapse>
				<NavigationCollapse icon="view_list" label="Collapse 2">
					<NavigationLink to="/c2m1" icon="person">
						Users
					</NavigationLink>
					<NavigationLink to="/c2m2" icon="people">
						Groups
					</NavigationLink>
				</NavigationCollapse>
				<NavigationCollapse icon="view_list" label="Collapse 3">
					<NavigationLink to="/c3m1" icon="inbox">
						Inbox
					</NavigationLink>
					<NavigationLink to="/c3m2" icon="archive">
						Archive
					</NavigationLink>
				</NavigationCollapse>
			</List>
		</Navigation>
		<MainContent>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/samples" component={Samples} />
				<Route path="/components" component={Components} />
				<Route path="/pets" component={NestDemo} />
				<Route path="/cards" component={Cards} />
				<Route path="/grid" component={GridDemo} />
				<Route path="/styled" component={StyledWithClassesDemo} />
			</Switch>
			<Route path="/pets/:id" component={ShowPet} />
		</MainContent>
		<BottomNavigation showLabels>
			<BottomNavigationAction value="/" icon={<Icon>home</Icon>} label="This" />
			<BottomNavigationAction
				value="/pets"
				icon={<Icon>star</Icon>}
				label="is just"
			/>
			<BottomNavigationAction
				value="/cards"
				icon={<Icon>timeline</Icon>}
				label="here"
			/>
			<BottomNavigationAction
				value="/grid"
				icon={<Icon>people</Icon>}
				label="for show"
			/>
		</BottomNavigation>
	</AppFrame>
)

/**
 * Example styled components with TypeScript CSS Properties and access to Material UI Theme.
 * Implemented with Material UI JSS. Can be used to style anything that accepts a className property,
 * including Material UI components and native elements.
 */

const StyledTitle = styled(Title)((theme) => ({
	color:
		theme.palette.type === "light" ? theme.palette.secondary.main : "yellow"
}))

const Separator = styled("div")({
	flex: 1
})

/**
 * Example custom UI components that need access to state and/or actions.
 */

const ToggleRightToLeft = () => (
	<WithThemeOptions>
		{({ toggleRightToLeft }) => (
			<Tooltip title="Toggle LTR / RTL">
				<IconButton color="inherit" onClick={toggleRightToLeft}>
					<Icon>swap_horiz</Icon>
				</IconButton>
			</Tooltip>
		)}
	</WithThemeOptions>
)
