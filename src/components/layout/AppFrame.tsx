import * as React from "react"

import { withStyles, WithTheme, withTheme } from "@material-ui/core"
import { Theme } from "@material-ui/core/styles"
import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles"
import classNames from "classnames"
import { BrowserRouter as Router } from "react-router-dom"
import returnof from "returnof"
import {
	LegacyCSSLayoutProvider,
	WithLegacyCSSLayout
} from "../layout/LegacyCSSLayout"
import { WithWidth } from "../utilities/WithWidth"

/**
 * Begin Styles
 */
const styles = (theme: Theme) => ({
	appFrame: {
		display: "grid",
		gridTemplateColumns: "auto auto minmax(0, 1fr)",
		gridTemplateRows: "auto minmax(0, 1fr) auto",
		/**
		 *                       auto            auto                       minmax(0, 1fr)
		 *                 +-------------------------------------------------------------------------------+
		 *           auto  |   titlebar        titlebar                        titlebar                    |
		 *                 |                                                                               |
		 *                 +---------------+---------------+-----------------------------------------------+
		 *                 |               |               |                                               |
		 *                 |               |               |                                               |
		 *                 |               |               |                                               |
		 *                 |               |               |                                               |
		 *                 |               |               |                                               |
		 *                 |               |               |                                               |
		 * minmax(0, 1fr)  |  navigation   |    submenu    |                    content                    |
		 *                 |               |               |                                               |
		 *                 |               |               |                                               |
		 *                 |               |               |                                               |
		 *                 |               |               |                                               |
		 *                 |               |               |                                               |
		 *                 |               |               |                                               |
		 *                 |               |               |                                               |
		 *                 |               |               |                                               |
		 *                 |               |               +-----------------------------------------------+
		 *           auto  |  navigation   |    submenu    |               bottomnavigation                |
		 *                 |               |               |                                               |
		 *                 +---------------+---------------+-----------------------------------------------+
		 */

		gridTemplateAreas:
			"'titlebar titlebar titlebar' 'navigation submenu content' 'navigation submenu bottomnavigation'",

		width: "100%",
		height: "100%"
	} as CSSProperties,

	appFrameLegacy: {} as CSSProperties,

	"@global": {
		html: {
			height: "100%",
			boxSizing: "border-box"
		},
		"*, *:before, *:after": {
			boxSizing: "inherit"
		},

		/**
		 * A WIP minimalist scrollbar.
		 * Todo: Figure out how to make it "overlay" on top of content instead of pushing content.
		 */

		/*
		"::-webkit-scrollbar": {
			width: 8,
			height: 8
		},

		"::-webkit-scrollbar-thumb": {
			backgroundColor: "#66666666",
			borderRadius: "8px"
		},

		"::-webkit-scrollbar-thumb:hover": {
			backgroundColor: "#666666AA"
		},
		*/

		body: {
			height: "100%",
			margin: 0,
			background: theme.palette.background.default,
			fontFamily: theme.typography.fontFamily,
			fontSize: theme.typography.fontSize,
			color: theme.palette.text.primary,

			// Helps fonts on OSX look more consistent with other systems
			WebkitFontSmoothing: "antialiased",
			MozOsxFontSmoothing: "grayscale",

			// Use momentum-based scrolling on iOS devices
			WebkitOverflowScrolling: "touch"
		},
		"#root": {
			height: "100%"
		}
	} as CSSProperties
})

const returnType = returnof(styles)
type ClassNames = keyof typeof returnType
/**
 * End Styles
 */

interface Props {
	children: React.ReactNode
	className?: string
	withLegacyMobileLayout?: boolean
}

export interface AppFrameContext {
	navigationDrawerOpen: boolean
	toggleNavigationDrawer: () => void
	openNavigationDrawer: () => void
	closeNavigationDrawer: () => void
}

interface State {
	navigationDrawerOpen: boolean
}

const { Consumer, Provider } = React.createContext<AppFrameContext>(null as any)

class AppFrame extends React.Component<
	Props & WithStyles<ClassNames> & WithTheme,
	State
> {
	public componentDidMount() {
		this.updatePage(this.props)
	}

	public componentWillReceiveProps(nextProps: Props & WithTheme) {
		if (nextProps === this.props) {
			return
		}
		this.updatePage(nextProps)
	}

	private updatePage(props: Props & WithTheme) {
		if (document.body) {
			document.body.dir = props.theme.direction === "rtl" ? "rtl" : "ltr"
		}

		const themeColorTag = document.querySelector(
			"meta[name=theme-color]"
		) as any

		if (themeColorTag) {
			themeColorTag.content = props.theme.palette.primary.dark
		}
	}

	public state = {
		navigationDrawerOpen: false
	}

	private toggleNavigationDrawer = () => {
		this.setState((previousState) => ({
			navigationDrawerOpen: !previousState.navigationDrawerOpen
		}))
	}

	private openNavigationDrawer = () => {
		if (!this.state.navigationDrawerOpen) {
			this.setState({ navigationDrawerOpen: true })
		}
	}

	private closeNavigationDrawer = () => {
		if (this.state.navigationDrawerOpen) {
			this.setState({ navigationDrawerOpen: false })
		}
	}

	public render() {
		const { children, className, classes, withLegacyMobileLayout } = this.props

		return (
			<Router>
				<Provider
					value={{
						...this.state,
						toggleNavigationDrawer: this.toggleNavigationDrawer,
						openNavigationDrawer: this.openNavigationDrawer,
						closeNavigationDrawer: this.closeNavigationDrawer
					}}
				>
					<WithWidth>
						{({ width }) => {
							const useMobileLayout =
								withLegacyMobileLayout && (width === "xs" || width === "sm")
							return (
								<LegacyCSSLayoutProvider disabled={!useMobileLayout}>
									<WithLegacyCSSLayout>
										{({ appBarHeight, bottomNavigationHeight }) => (
											<div
												className={classNames(
													useMobileLayout
														? classes.appFrameLegacy
														: classes.appFrame,
													className
												)}
												style={
													useMobileLayout
														? {
																paddingTop: appBarHeight,
																paddingBottom: bottomNavigationHeight
														  }
														: undefined
												}
											>
												{children}
											</div>
										)}
									</WithLegacyCSSLayout>
								</LegacyCSSLayoutProvider>
							)
						}}
					</WithWidth>
				</Provider>
			</Router>
		)
	}
}

/**
 * AppFrame is the root container of your application. Implements a
 * responsive layout that is friendly to both desktop and mobile browsers.
 */
const AppFrameWithThemeAndStyles = withTheme()(
	withStyles(styles, { withTheme: true })(AppFrame)
)

export {
	AppFrameWithThemeAndStyles as AppFrame,
	Consumer as WithAppFrameContext
}
