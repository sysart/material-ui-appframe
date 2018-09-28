import * as React from "react"

import { Slide } from "@material-ui/core"
import { SlideProps } from "@material-ui/core/Slide"
import { RoutedDialog, RoutedDialogProps } from "../layout/RoutedDialog"

export const MobileActivity = (props: RoutedDialogProps) => (
	<RoutedDialog fullScreen TransitionComponent={Transition} {...props} />
)

const Transition = (props: SlideProps) => <Slide direction="left" {...props} />
