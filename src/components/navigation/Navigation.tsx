import * as React from "react"

import {
	Divider,
	Drawer,
	Hidden,
	SwipeableDrawer,
	withStyles
} from "@material-ui/core"
import { Theme } from "@material-ui/core/styles"
import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles"
import { RouteComponentProps, withRouter } from "react-router"
import returnof from "returnof"
import { WithAppFrameContext } from "../layout/AppFrame"

/**
 * Begin Styles
 */
const styles = (theme: Theme) => ({
	drawerDocked: {
		gridArea: "navigation",
		display: "flex"
	} as CSSProperties,

	drawerHeader: theme.mixins.toolbar as CSSProperties,

	drawerSwipeable: {
		width: 250
	} as CSSProperties,

	drawerPaper: {
		width: 250,
		position: "static",
		height: "auto"
	} as CSSProperties
})

const returnType = returnof(styles)
type ClassNames = keyof typeof returnType
/**
 * End Styles
 */

interface Props {
	children: React.ReactNode
}

export interface NavigationDrawerContext {
	/**
	 * Report to the drawer that a collapse has been opened
	 */
	collapseOpen: () => void

	/**
	 * Subscribe to receive updates about a collapse panel opening
	 * @param listener function to be called when a collapse opens
	 */
	subscribeToCollapseOpen: (listener: () => void) => void
	unsubscribeFromCollapseOpen: (listener: () => void) => void
}

const { Consumer, Provider } = React.createContext<NavigationDrawerContext>(
	undefined as any
)

class NavigationDrawer extends React.Component<
	Props & WithStyles<ClassNames> & RouteComponentProps<void>,
	{}
> {
	private collapseOpenListeners: Array<() => void> = []

	private collapseOpen = () => {
		this.collapseOpenListeners.forEach((listener) => listener())
	}

	private subscribeToCollapseOpen = (listener: () => void) => {
		this.collapseOpenListeners.push(listener)
	}

	private unsubscribeFromCollapseOpen = (listener: () => void) => {
		const index = this.collapseOpenListeners.indexOf(listener)
		if (index === -1) {
			return
		}
		this.collapseOpenListeners.splice(index, 1)
	}

	public render() {
		const { children, classes } = this.props
		return (
			<Provider
				value={{
					collapseOpen: this.collapseOpen,
					subscribeToCollapseOpen: this.subscribeToCollapseOpen,
					unsubscribeFromCollapseOpen: this.unsubscribeFromCollapseOpen
				}}
			>
				<Hidden mdUp implementation="css">
					<WithAppFrameContext>
						{({
							navigationDrawerOpen,
							openNavigationDrawer,
							closeNavigationDrawer
						}) => (
							<SwipeableDrawer
								open={navigationDrawerOpen}
								classes={{
									paper: classes.drawerSwipeable
								}}
								onOpen={openNavigationDrawer}
								onClose={closeNavigationDrawer}
								ModalProps={{
									keepMounted: true
								}}
								keepMounted
							>
								<nav>
									<div className={classes.drawerHeader} />
									<Divider />
									{children}
								</nav>
							</SwipeableDrawer>
						)}
					</WithAppFrameContext>
				</Hidden>
				<Hidden smDown>
					<Drawer
						variant="permanent"
						open
						classes={{
							docked: classes.drawerDocked,
							paper: classes.drawerPaper
						}}
					>
						<nav>
							{/*<div className={classes.drawerHeader} />*/}
							{children}
						</nav>
					</Drawer>
				</Hidden>
			</Provider>
		)
	}
}

/**
 * Navigation is the main navigation view of your application.
 * It should contain a list of navigation elements (List, Divider,
 * NavigationLink etc.) as children.
 */
const NavigationWithHOC = withRouter(
	withStyles(styles, { withTheme: true })(NavigationDrawer)
)

export {
	Consumer as WithNavigationDrawerContext,
	NavigationWithHOC as Navigation
}
