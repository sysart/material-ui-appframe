import * as React from "react"

import { Button } from "@material-ui/core"
import { withStyles } from "@material-ui/core"
import { ButtonProps } from "@material-ui/core/Button"
import { Theme } from "@material-ui/core/styles"
import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles"
import { WithAppFrameContext } from "./AppFrame"

export type FloatingActionButtonProps = Pick<
	ButtonProps,
	Exclude<keyof ButtonProps, "classes">
>

const styles = (theme: Theme) => ({
	fab: {
		position: "absolute",
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2
	} as CSSProperties
})

export const FloatingActionButton = withStyles(styles, { withTheme: true })(
	(props: FloatingActionButtonProps & WithStyles<"fab", true>) => (
		<WithAppFrameContext>
			{({ bottomNavigationHeight, useGridLayout }) =>
				useGridLayout
					? renderGrid(props)
					: renderStandard(props, bottomNavigationHeight)
			}
		</WithAppFrameContext>
	)
)

const renderStandard = (
	props: FloatingActionButtonProps & WithStyles<"fab", true>,
	bottomNavigationHeight: number
) => {
	const { classes, ...remainingProps } = props
	return (
		<Button
			variant="fab"
			className={classes.fab}
			style={{
				position: "fixed",
				bottom: props.theme.spacing.unit * 2 + bottomNavigationHeight
			}}
			{...remainingProps}
		/>
	)
}

const renderGrid = (
	props: FloatingActionButtonProps & WithStyles<"fab", true>
) => {
	const { classes, ...remainingProps } = props
	return <Button variant="fab" className={classes.fab} {...remainingProps} />
}
