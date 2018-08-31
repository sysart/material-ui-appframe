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
	main: {
		gridArea: "content",
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
		overflowY: "auto"
	} as CSSProperties
})

/**
 * The main content of your application.
 */
export const MainContent = withStyles(styles)(
	(props: Props & WithStyles<"main">) => (
		<main className={classNames(props.classes.main, props.className)}>
			{props.children}
		</main>
	)
)
