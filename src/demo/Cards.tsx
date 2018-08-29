import * as React from "react"

import {
	Card,
	CardContent,
	CardHeader,
	Grid,
	Typography
} from "@material-ui/core"

export const Cards = () => (
	<Grid container spacing={16}>
		{/*<Grid item xs={12}>
			<Typography variant="display3">A bunch of cards</Typography>
</Grid>*/}
		{Array.from(Array(40).keys()).map((n, i) => (
			<Grid key={i} item xs={6}>
				<Card>
					<CardHeader title="Example card" />
					<CardContent>
						<Typography>Example content goes here.</Typography>
					</CardContent>
				</Card>
			</Grid>
		))}
	</Grid>
)
