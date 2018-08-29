import * as React from "react"

import { Hidden, Icon, IconButton } from "@material-ui/core"
import { IconButtonProps } from "@material-ui/core/IconButton"
import { WithAppFrameContext } from "../../layout/AppFrame"

export const NavigationToggle = (props: IconButtonProps) => (
	<WithAppFrameContext>
		{({ toggleNavigationDrawer }) => (
			<Hidden mdUp>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={toggleNavigationDrawer}
					{...props}
				>
					<Icon>menu</Icon>
				</IconButton>
			</Hidden>
		)}
	</WithAppFrameContext>
)
