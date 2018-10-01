import * as React from "react"

import { Icon, IconButton } from "@material-ui/core"
import { WithRoutedDialogContext } from "../../layout/RoutedDialog"

interface Props {
	icon?: React.ReactNode
}

export const UpNavigationButton = ({ icon }: Props) => (
	<WithRoutedDialogContext>
		{({ goBack }) => (
			<IconButton color="inherit" onClick={goBack}>
				{typeof icon === "string" ? (
					<Icon>{icon}</Icon>
				) : (
					icon || <Icon>arrow_back</Icon>
				)}
			</IconButton>
		)}
	</WithRoutedDialogContext>
)
