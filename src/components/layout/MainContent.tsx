import * as React from "react"

import { withStyles } from "@material-ui/core"
import { Theme } from "@material-ui/core/styles"
import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles"
import classNames from "classnames"

interface Props {
	children: JSX.Element | JSX.Element[]
	className?: string
}

const styles = (theme: Theme) => ({
	container: {
		gridArea: "content",
		backgroundColor: theme.palette.background.default,
		position: "relative" // Allow components e.g. floating action buttons to be positioned independently of scroll
	} as CSSProperties,

	main: {
		height: "100%",
		overflowY: "auto",
		padding: theme.spacing.unit * 3
	} as CSSProperties
})

/**
 * The main content of your application.
 */
export const MainContent = withStyles(styles)(
	(props: Props & WithStyles<"container" | "main">) => (
		<div className={props.classes.container}>
			<main className={classNames(props.classes.main, props.className)}>
				{props.children}
			</main>
		</div>
	)
)
