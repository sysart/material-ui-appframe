import * as React from "react"

import {
	Card,
	CardContent,
	CardHeader,
	Grid,
	Typography
} from "@material-ui/core"
import { Create as CreateIcon } from "@material-ui/icons"
import { FloatingActionButton } from "components"

export const Cards = () => (
	<Grid container spacing={16}>
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
		<FloatingActionButton color="primary" aria-label="Add">
			<CreateIcon />
		</FloatingActionButton>
	</Grid>
)
