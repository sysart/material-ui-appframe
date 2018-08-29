import * as React from "react"

import {
	Icon,
	ListItem,
	ListItemIcon,
	ListItemText,
	withStyles,
	WithStyles
} from "@material-ui/core"
import { ListItemProps } from "@material-ui/core/ListItem"
import { ListItemIconProps } from "@material-ui/core/ListItemIcon"
import { ListItemTextProps } from "@material-ui/core/ListItemText"
import { Theme } from "@material-ui/core/styles"
import { CSSProperties } from "@material-ui/core/styles/withStyles"
import { RouteComponentProps, withRouter } from "react-router"
import { Link, LinkProps } from "react-router-dom"
import returnof from "returnof"
import { WithAppFrameContext } from "../layout/AppFrame"

/**
 * Begin styles
 */

const styles = (theme: Theme) => ({
	navItem: {} as CSSProperties,

	selectedNavIcon: {
		color: "inherit"
	} as CSSProperties,

	selectedNavItem: {
		color: theme.palette.type === "light" ? "black" : "white"
	} as CSSProperties,

	selectedNavText: {
		color: "inherit"
	} as CSSProperties,

	sidebarLink: {
		color: "initial",
		textDecoration: "none"
	} as CSSProperties
})

const returnType = returnof(styles)
type ClassNames = keyof typeof returnType

/**
 * End styles
 */

interface Props {
	to: string
	exact?: boolean
	icon?: string | React.ReactElement<any>
	text?: string
	children: React.ReactNode
	// Optional props for the Link
	linkProps?: LinkProps
	// Optional props for the ListItem
	listItemProps?: ListItemProps
	// Optional props for the ListItemIcon
	listItemIconProps?: ListItemIconProps
	// Optional props for the ListItemText
	listItemTextProps?: ListItemTextProps
}

class NavigationLink extends React.Component<
	Props & WithStyles<ClassNames> & RouteComponentProps<void>
> {
	public render() {
		const {
			classes,
			exact,
			to,
			icon,
			children,
			location,
			linkProps,
			listItemProps,
			listItemIconProps,
			listItemTextProps
		} = this.props

		const navLinkSelected = exact
			? location.pathname === to
			: location.pathname.startsWith(to)

		return (
			<WithAppFrameContext>
				{({ closeNavigationDrawer }) => (
					<Link
						onClick={closeNavigationDrawer}
						to={to}
						className={classes.sidebarLink}
						{...linkProps}
					>
						<ListItem
							selected={navLinkSelected}
							button
							className={
								navLinkSelected
									? `${classes.selectedNavItem} ${classes.navItem}`
									: classes.navItem
							}
							{...listItemProps}
						>
							{icon && (
								<ListItemIcon
									className={
										navLinkSelected ? classes.selectedNavIcon : undefined
									}
									{...listItemIconProps}
								>
									{typeof icon === "string" ? <Icon>{icon}</Icon> : icon}
								</ListItemIcon>
							)}
							<ListItemText
								primary={children}
								classes={
									navLinkSelected
										? { primary: classes.selectedNavText }
										: undefined
								}
								{...listItemTextProps}
							/>
						</ListItem>
					</Link>
				)}
			</WithAppFrameContext>
		)
	}
}

const NavigationLinkWithHOC = withRouter(
	withStyles(styles, { withTheme: true })(NavigationLink)
)

export { NavigationLinkWithHOC as NavigationLink, Props as NavigationLinkProps }
