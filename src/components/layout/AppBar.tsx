import * as React from "react"

import { AppBar as MuiAppBar } from "@material-ui/core"
import { AppBarProps } from "@material-ui/core/AppBar"
import { WithLegacyCSSLayout } from "../layout/LegacyCSSLayout"
import { MeasureHeight } from "../utilities/MeasureHeight"
import { styled } from "../utilities/styled"

const StyledAppBar = styled(MuiAppBar)(() => ({
	position: "static",
	overflow: "hidden", // That's right, better not cram too much stuff in there
	gridArea: "titlebar"
}))

const StyledLegacyAppBar = styled(MuiAppBar)((theme) => ({
	position: "static",
	overflow: "hidden",

	[theme.breakpoints.down("sm")]: {
		position: "fixed"
	}
}))

export const AppBar = (props: AppBarProps) => (
	<WithLegacyCSSLayout>
		{({ legacyMobileCssEnabled, setAppBarHeight }) =>
			legacyMobileCssEnabled ? (
				<MeasureHeight reportHeight={setAppBarHeight}>
					<StyledLegacyAppBar {...props} />
				</MeasureHeight>
			) : (
				<StyledAppBar {...props} />
			)
		}
	</WithLegacyCSSLayout>
)
