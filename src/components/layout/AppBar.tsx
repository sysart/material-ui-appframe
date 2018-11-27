import * as React from "react"

import { AppBar as MuiAppBar } from "@material-ui/core"
import { AppBarProps } from "@material-ui/core/AppBar"
import { MeasureDOMProperty } from "components/utilities/MeasureDOMProperty"
import { WithAppFrameContext } from "../layout/AppFrame"
import { styled } from "../utilities/styled"

export const AppBar = (props: AppBarProps) => (
	<WithAppFrameContext>
		{({ setAppBarHeight, useGridLayout }) => (
			<MeasureDOMProperty
				default={0}
				getValue={(elem: any) => (elem.clientHeight as number) || 0}
				reportValue={setAppBarHeight}
			>
				{useGridLayout
					? renderGrid(props)
					: renderStandard(props, setAppBarHeight)}
			</MeasureDOMProperty>
		)}
	</WithAppFrameContext>
)

const AppBarStandard = styled(MuiAppBar)({
	overflow: "hidden", // That's right, better not cram too much stuff in there
	position: "fixed"
})

const renderStandard = (
	props: AppBarProps,
	setAppBarHeight: (height: number) => void
) => (
	<MeasureDOMProperty
		default={0}
		getValue={(elem: any) => (elem.clientHeight as number) || 0}
		reportValue={setAppBarHeight}
	>
		<AppBarStandard {...props} />
	</MeasureDOMProperty>
)

const AppBarGrid = styled(MuiAppBar)({
	position: "static",
	gridArea: "titlebar"
})

const renderGrid = (props: AppBarProps) => <AppBarGrid {...props} />
