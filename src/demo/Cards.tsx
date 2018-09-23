import * as React from "react"

import {
	Button,
	Card,
	CardContent,
	CardHeader,
	Grid,
	Typography
} from "@material-ui/core"
import { Create as CreateIcon } from "@material-ui/icons"
import { styled } from "components/utilities"

const AddButton = styled(Button)((theme) => ({
	position: "absolute",
	bottom: theme.spacing.unit * 2,
	right: theme.spacing.unit * 2
}))

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
		<AddButton variant="fab" color="primary" aria-label="Add">
			<CreateIcon />
		</AddButton>
	</Grid>
)
