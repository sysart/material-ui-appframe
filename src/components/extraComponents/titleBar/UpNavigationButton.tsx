import * as React from "react"

import { Icon, IconButton } from "@material-ui/core"
import { withRouter } from "react-router"

export const UpNavigationButton = withRouter((props) => (
	<IconButton
		color="inherit"
		onClick={() => {
			props.history.push(
				props.location.pathname.slice(
					0,
					props.location.pathname.lastIndexOf("/")
				)
			)
		}}
	>
		<Icon>arrow_back</Icon>
	</IconButton>
))
