import * as React from "react"

import {
	BottomNavigationAction as MuiBottomNavigationAction,
	Divider,
	Hidden,
	Icon,
	IconButton,
	List,
	ListSubheader
} from "@material-ui/core"
import { HomePage } from "components/HomePage"
import {
	AppFrame,
	BottomNavigation,
	MainContent,
	Navigation,
	NavigationLink,
	Title,
	TitleBar,
	TitleBarSearch
} from "material-ui-appframe"
import { styled } from "material-ui-appframe/utilities"
import { Route, Switch } from "react-router"

const BottomNavigationAction = styled(MuiBottomNavigationAction)({
	minWidth: 30
})

const StyledTitle = styled(Title)({
	margin: 10,
	flexShrink: 0
})

const Separator = styled("div")({
	flex: 1
})

export const App = () => (
	<AppFrame>
		<TitleBar>
			<StyledTitle>My Video App</StyledTitle>
			<Hidden xsDown>
				<TitleBarSearch autoFocus />
			</Hidden>
			<Hidden smUp>
				<Separator />
			</Hidden>
			<IconButton color="inherit" aria-label="cast to nearby device">
				<Icon>cast</Icon>
			</IconButton>
			<IconButton color="inherit" aria-label="broadcast">
				<Icon>videocam</Icon>
			</IconButton>
			<Hidden smUp>
				<IconButton color="inherit" aria-label="search">
					<Icon>search</Icon>
				</IconButton>
			</Hidden>
			<IconButton color="inherit" aria-label="my profile">
				<Icon>person</Icon>
			</IconButton>
		</TitleBar>
		<Navigation>
			<Divider />
			<List>
				<NavigationLink exact to="/" icon="home">
					Home
				</NavigationLink>
				<NavigationLink to="/trending" icon="trending_up">
					Trending
				</NavigationLink>
				<NavigationLink to="/subscriptions" icon="theaters">
					Subscriptions
				</NavigationLink>
			</List>
			<Divider />
			<List>
				<ListSubheader>Library</ListSubheader>
				<NavigationLink to="/library/history" icon="history">
					History
				</NavigationLink>
				<NavigationLink to="/library/watchlater" icon="watch_later">
					Watch Later
				</NavigationLink>
				<NavigationLink to="/library/liked" icon="playlist_play">
					Liked videos
				</NavigationLink>
			</List>
			<List>
				<ListSubheader>Subscriptions</ListSubheader>
				<NavigationLink to="/channel/popular" icon="star">
					Popular
				</NavigationLink>
				<NavigationLink to="/channel/music" icon="star">
					Music
				</NavigationLink>
				<NavigationLink to="/channel/sports" icon="star">
					Sports
				</NavigationLink>
				<NavigationLink to="/channel/gaming" icon="star">
					Gaming
				</NavigationLink>
			</List>
			<Divider />
			<List>
				<NavigationLink to="/settings" icon="settings">
					Settings
				</NavigationLink>
				<NavigationLink to="/help" icon="help">
					Help
				</NavigationLink>
				<NavigationLink to="/feedback" icon="feedback">
					Feedback
				</NavigationLink>
			</List>
		</Navigation>
		<MainContent>
			<Switch>
				<Route exact path="/" component={HomePage} />
			</Switch>
		</MainContent>
		<BottomNavigation showLabels mobileOnly>
			<BottomNavigationAction value="/" icon={<Icon>home</Icon>} label="Home" />
			<BottomNavigationAction
				value="/trending"
				icon={<Icon>trending_up</Icon>}
				label="Trending"
			/>
			<BottomNavigationAction
				value="/subscriptions"
				icon={<Icon>theaters</Icon>}
				label="Subscriptions"
			/>
			<BottomNavigationAction
				value="/inbox"
				icon={<Icon>email</Icon>}
				label="Inbox"
			/>
			<BottomNavigationAction
				value="/library"
				icon={<Icon>folder</Icon>}
				label="Library"
			/>
		</BottomNavigation>
	</AppFrame>
)
