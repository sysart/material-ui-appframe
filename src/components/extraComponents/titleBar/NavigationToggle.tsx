import * as React from "react"

import { Icon, IconButton } from "@material-ui/core"
import { IconButtonProps } from "@material-ui/core/IconButton"
import { WithAppFrameContext } from "../../layout/AppFrame"

interface Props {
	icon?: React.ReactNode
}

export const NavigationToggle = ({
	icon,
	...remainingProps
}: Props & IconButtonProps) => (
	<WithAppFrameContext>
		{({ toggleNavigationDrawer }) => (
			<IconButton
				color="inherit"
				aria-label="open drawer"
				onClick={toggleNavigationDrawer}
				{...remainingProps}
			>
				{typeof icon === "string" ? (
					<Icon>{icon}</Icon>
				) : (
					icon || <Icon>menu</Icon>
				)}
			</IconButton>
		)}
	</WithAppFrameContext>
)
