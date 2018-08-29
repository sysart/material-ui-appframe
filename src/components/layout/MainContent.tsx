import * as React from "react"

import { WithLegacyCSSLayout } from "../layout/LegacyCSSLayout"
import { styled } from "../utilities/styled"
import { WithWidth } from "../utilities/WithWidth"

interface Props {
	children: JSX.Element | JSX.Element[]
}

const StyledMain = styled("main")((theme) => ({
	gridArea: "content",
	backgroundColor: theme.palette.background.default,
	padding: theme.spacing.unit * 3,
	overflowY: "auto"
}))

/**
 * The main content of your application.
 */
export const MainContent = (props: Props) => (
	<WithLegacyCSSLayout>
		{({ legacyMobileCssEnabled, appBarHeight, bottomNavigationHeight }) => (
			<WithWidth>
				{({ width }) => (
					<StyledMain
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
					</StyledMain>
				)}
			</WithWidth>
		)}
	</WithLegacyCSSLayout>
)
