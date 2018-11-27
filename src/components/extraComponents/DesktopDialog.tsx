import * as React from "react"

import { Fade } from "@material-ui/core"
import { DialogProps } from "@material-ui/core/Dialog"
import { AppFrame } from "../layout/AppFrame"
import { RoutedDialog } from "../layout/RoutedDialog"

export const DesktopDialog = (props: Partial<DialogProps>) => {
	const { children, ...remainingProps } = props
	return (
		<RoutedDialog fullWidth TransitionComponent={Fade} {...remainingProps}>
			<AppFrame withGridLayout>{children}</AppFrame>
		</RoutedDialog>
	)
}
