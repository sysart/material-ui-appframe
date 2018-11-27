import * as React from "react"

import { Slide } from "@material-ui/core"
import { DialogProps } from "@material-ui/core/Dialog"
import { SlideProps } from "@material-ui/core/Slide"
import { AppFrame } from "../layout/AppFrame"
import { RoutedDialog } from "../layout/RoutedDialog"

export const MobileActivity = (props: Partial<DialogProps>) => {
	const { children, ...remainingProps } = props
	return (
		<RoutedDialog
			fullScreen
			TransitionComponent={Transition}
			{...remainingProps}
		>
			<AppFrame withGridLayout>{children}</AppFrame>
		</RoutedDialog>
	)
}

const Transition = (props: SlideProps) => <Slide direction="left" {...props} />
