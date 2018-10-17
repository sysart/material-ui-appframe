import * as React from "react"

import { Grid, Typography } from "@material-ui/core"

export const GridDemo = () => (
	<Grid container spacing={16}>
		<Grid item xs={12}>
			<Typography variant="h2">CSS3 Grid demo</Typography>
			<Typography variant="subtitle1">Nothing to see here yet.</Typography>
		</Grid>
	</Grid>
)
