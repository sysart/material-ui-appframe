import * as React from "react"

import { withStyles } from "@material-ui/core"
import { Theme } from "@material-ui/core/styles"
import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles"
import classNames from "classnames"
import { WithLegacyCSSLayout } from "../layout/LegacyCSSLayout"
import { WithWidth } from "../utilities/WithWidth"

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
		<WithLegacyCSSLayout>
			{({ legacyMobileCssEnabled, appBarHeight, bottomNavigationHeight }) => (
				<WithWidth>
					{({ width }) => (
						<main
							className={classNames(props.classes.main, props.className)}
							style={
								(legacyMobileCssEnabled &&
									(width === "xs" || width === "sm") && {
										overflowY: "visible",
										marginTop: appBarHeight,
										marginBottom: bottomNavigationHeight
									}) ||
								undefined
							}
						>
							{props.children}
						</main>
					)}
				</WithWidth>
			)}
		</WithLegacyCSSLayout>
	)
)
