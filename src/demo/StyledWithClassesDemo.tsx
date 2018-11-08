import * as React from "react"

import { Button, Grid, Typography, withStyles } from "@material-ui/core"
import { CSSProperties } from "@material-ui/core/styles/withStyles"

const ButtonStyledWithWithStyles = withStyles({
	root: {
		background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
		borderRadius: 3,
		border: 0,
		color: "white",
		height: 48,
		padding: "0 30px",
		boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
	} as CSSProperties,
	label: {
		textTransform: "capitalize"
	} as CSSProperties
})(Button)

export const StyledWithClassesDemo = () => (
	<Grid container spacing={16}>
		<Grid item xs={12}>
			<Typography>Styled by overriding classes prop:</Typography>
			<ButtonStyledWithWithStyles>class override</ButtonStyledWithWithStyles>
		</Grid>
	</Grid>
)
