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
import { WithLifecycle } from "components/utilities/WithLifecycle"
import { RouteComponentProps, withRouter } from "react-router"
import returnof from "returnof"
import { WithAppFrameContext } from "../layout/AppFrame"
import { MeasureDOMProperty } from "../utilities/MeasureDOMProperty"
import { CSSDrawer } from "./CSSDrawer"

/**
 * Begin Styles
 */
const styles = (theme: Theme) => ({
	drawerDockedGrid: {
		gridArea: "navigation",
		display: "flex"
	} as CSSProperties,

	drawerDockedStandard: {
		position: "fixed",
		bottom: 0,
		left: 0,
		top: 0,
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
				return renderTemporaryDrawer(this.props)
			case "permanent":
				return renderPermanentDrawer(this.props)
		}
	}
}

const renderTemporaryDrawer = (
	props: Props & WithStyles<ClassNames> & RouteComponentProps<void> & WithWidth
) => {
	const { children, classes } = props
	const scrollSnapSupported = CSS.supports("scroll-snap-align: start")
	return (
		<WithAppFrameContext>
			{({
				navigationDrawerOpen,
				openNavigationDrawer,
				closeNavigationDrawer,
				setNavigationDrawerWidth,
				useGridLayout
			}) =>
				scrollSnapSupported ? (
					<CSSDrawer
						drawerWidth={270}
						open={navigationDrawerOpen}
						onOpen={openNavigationDrawer}
						onClose={closeNavigationDrawer}
					>
						{!useGridLayout && (
							<WithLifecycle
								mount
								callback={() => {
									setNavigationDrawerWidth(0)
								}}
							/>
						)}

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
						{!useGridLayout && (
							<WithLifecycle
								mount
								callback={() => {
									setNavigationDrawerWidth(0)
								}}
							/>
						)}
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

const renderPermanentDrawer = (
	props: Props & WithStyles<ClassNames> & RouteComponentProps<void> & WithWidth
) => {
	return (
		<WithAppFrameContext>
			{({ useGridLayout, setNavigationDrawerWidth, appBarHeight }) =>
				useGridLayout
					? renderPermanentDrawerGrid(props)
					: renderPermanentDrawerStandard(
							props,
							setNavigationDrawerWidth,
							appBarHeight
					  )
			}
		</WithAppFrameContext>
	)
}

const renderPermanentDrawerStandard = (
	props: Props & WithStyles<ClassNames> & RouteComponentProps<void> & WithWidth,
	setNavigationDrawerWidth: (width: number) => void,
	appBarHeight: number
) => {
	const { children, classes } = props

	return (
		<MeasureDOMProperty
			default={0}
			reportValue={setNavigationDrawerWidth}
			getValue={(elem: any) => elem.clientWidth || 0}
		>
			<Drawer
				style={{ top: appBarHeight }}
				variant="permanent"
				open
				classes={{
					docked: classes.drawerDockedStandard,
					paper: classes.drawerPaper
				}}
			>
				<nav>
					{/*<div className={classes.drawerHeader} />*/}
					{children}
				</nav>
			</Drawer>
		</MeasureDOMProperty>
	)
}

const renderPermanentDrawerGrid = (
	props: Props & WithStyles<ClassNames> & RouteComponentProps<void> & WithWidth
) => {
	const { children, classes } = props

	return (
		<Drawer
			variant="permanent"
			open
			classes={{
				docked: classes.drawerDockedGrid,
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
