import * as React from "react"

import {
	Divider,
	Drawer,
	SwipeableDrawer,
	withStyles,
	withWidth
} from "@material-ui/core"
import { Theme } from "@material-ui/core/styles"
import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles"
import { WithWidth } from "@material-ui/core/withWidth"
import { RouteComponentProps, withRouter } from "react-router"
import returnof from "returnof"
import { WithAppFrameContext } from "../layout/AppFrame"
import { CSSDrawer } from "./CSSDrawer"

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
		width: 270
	} as CSSProperties,

	drawerPaper: {
		width: 270,
		position: "static",
		height: "auto"
	} as CSSProperties
})

const returnType = returnof(styles)
type ClassNames = keyof typeof returnType
/**
 * End Styles
 */

type DrawerVariant = "temporary" | "permanent"

interface DrawerVariants {
	variant: DrawerVariant
	variantSm: DrawerVariant
	variantMd: DrawerVariant
	variantLg: DrawerVariant
	variantXl: DrawerVariant
}
interface Props extends Partial<DrawerVariants> {
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
	Props & WithStyles<ClassNames> & RouteComponentProps<void> & WithWidth,
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

	private renderTemporaryDrawer() {
		const { children, classes } = this.props
		const scrollSnapSupported = CSS.supports("scroll-snap-align: start")
		return (
			<WithAppFrameContext>
				{({
					navigationDrawerOpen,
					openNavigationDrawer,
					closeNavigationDrawer
				}) =>
					scrollSnapSupported ? (
						<CSSDrawer
							drawerWidth={270}
							open={navigationDrawerOpen}
							onOpen={openNavigationDrawer}
							onClose={closeNavigationDrawer}
						>
							<nav>
								<div className={classes.drawerHeader} />
								<Divider />
								{children}
							</nav>
						</CSSDrawer>
					) : (
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
					)
				}
			</WithAppFrameContext>
		)
	}

	private renderPermanentDrawer() {
		const { children, classes } = this.props

		return (
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
		)
	}

	private getDrawerVariants: () => DrawerVariants = () => {
		const { variant, variantSm, variantMd, variantLg, variantXl } = this.props
		const hasCustomDrawerVariant = !!(
			variant ||
			variantSm ||
			variantMd ||
			variantLg ||
			variantXl
		)

		if (hasCustomDrawerVariant) {
			return this.fillVariants(this.props)
		}

		return {
			variant: "temporary",
			variantSm: "temporary",
			variantMd: "permanent",
			variantLg: "permanent",
			variantXl: "permanent"
		}
	}

	private fillVariants: (
		breakpoints: Partial<DrawerVariants>
	) => DrawerVariants = (breakpoints) => {
		const variant = breakpoints.variant || "temporary"
		const variantSm = breakpoints.variantSm || variant
		const variantMd = breakpoints.variantMd || variantSm
		const variantLg = breakpoints.variantLg || variantMd
		const variantXl = breakpoints.variantXl || variantLg

		return { variant, variantSm, variantMd, variantLg, variantXl }
	}

	private renderDrawerVariant(variant: DrawerVariant) {
		switch (variant) {
			case "temporary":
				return this.renderTemporaryDrawer()
			case "permanent":
				return this.renderPermanentDrawer()
		}
	}

	private renderDrawer() {
		const drawerVariants = this.getDrawerVariants()

		const { width } = this.props
		switch (width) {
			case "xs":
				return this.renderDrawerVariant(drawerVariants.variant)
			case "sm":
				return this.renderDrawerVariant(drawerVariants.variantSm)
			case "md":
				return this.renderDrawerVariant(drawerVariants.variantMd)
			case "lg":
				return this.renderDrawerVariant(drawerVariants.variantLg)
			case "xl":
				return this.renderDrawerVariant(drawerVariants.variantXl)
		}
	}

	public render() {
		return (
			<Provider
				value={{
					collapseOpen: this.collapseOpen,
					subscribeToCollapseOpen: this.subscribeToCollapseOpen,
					unsubscribeFromCollapseOpen: this.unsubscribeFromCollapseOpen
				}}
			>
				{this.renderDrawer()}
			</Provider>
		)
	}
}

/**
 * Navigation is the main navigation view of your application.
 * It should contain a list of navigation elements (List, Divider,
 * NavigationLink etc.) as children.
 */
const NavigationWithHOC = withWidth()(
	withRouter(withStyles(styles, { withTheme: true })(NavigationDrawer))
)

export {
	Consumer as WithNavigationDrawerContext,
	NavigationWithHOC as Navigation
}
