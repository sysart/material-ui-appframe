import * as React from "react"

import { Card, CardContent, Grid, Typography } from "@material-ui/core"

export const Home = () => (
	<Grid container spacing={16}>
		<Grid item>
			<Typography variant="h3">Welcome to Material UI AppFrame</Typography>
			<Typography variant="subtitle1">
				Powering the next generation of progressive web applications
			</Typography>
		</Grid>
		<Grid item xs={12} /*sm={9}*/ container spacing={16}>
			<Grid item xs={12}>
				<Card>
					<CardContent>
						<Typography>
							This will be a demo page where we showcase some of the things you
							can do with Material UI and Material UI AppFrame. To see how this
							page was made, feel free to take a look at the source code and
							also show it to your wife, kids, dog ..
						</Typography>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	</Grid>
)
