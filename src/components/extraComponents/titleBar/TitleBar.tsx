import * as React from "react"

import { Toolbar } from "@material-ui/core"
import { AppBarProps } from "@material-ui/core/AppBar"
import { ToolbarProps } from "@material-ui/core/Toolbar"
import { AppBar } from "../../layout/AppBar"

interface Props {
	children: React.ReactNode

	className?: string

	/**
	 * Optional props for the AppBar
	 */
	appBarProps?: AppBarProps
	/**
	 * Optional props for the Toolbar
	 */
	toolbarProps?: ToolbarProps
}

/**
 * TitleBar is a shorthand for nesting a Material UI Toolbar inside an AppFrame provided AppBar.
 * @example
 * <AppBar>
 *   <Toolbar>{children}</Toolbar>
 * </AppBar>
 */

export const TitleBar = ({
	appBarProps,
	children,
	className,
	toolbarProps
}: Props) => (
	<AppBar className={className} {...appBarProps}>
		<Toolbar {...toolbarProps}>{children}</Toolbar>
	</AppBar>
)
