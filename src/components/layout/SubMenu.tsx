import * as React from "react"

import { withStyles } from "@material-ui/core"
import { Theme } from "@material-ui/core/styles"
import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles"
import classNames from "classnames"

interface Props {
	children: JSX.Element | JSX.Element[]
	className?: string
	style?: CSSProperties
}

const styles = (theme: Theme) => ({
	submenu: {
		height: "100%",
		overflowY: "auto"
	} as CSSProperties,
	container: {
		gridArea: "submenu",
		backgroundColor: theme.palette.background.default,
		position: "relative"
	} as CSSProperties
})

/**
 * Sub menu for wide layouts.
 */
export const SubMenu = withStyles(styles)(
	(props: Props & WithStyles<"submenu" | "container">) => (
		<div
			style={props.style}
			className={classNames(props.classes.container, props.className)}
		>
			<div className={classNames(props.classes.submenu, props.className)}>
				{props.children}
			</div>
		</div>
	)
)
