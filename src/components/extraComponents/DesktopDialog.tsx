import * as React from "react"

import { Fade } from "@material-ui/core"
import { RoutedDialog, RoutedDialogProps } from "../layout/RoutedDialog"

export const DesktopDialog = (props: RoutedDialogProps) => (
	<RoutedDialog TransitionComponent={Fade} fullWidth {...props} />
)
