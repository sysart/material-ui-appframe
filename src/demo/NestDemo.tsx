import * as React from "react"

import {
	Card,
	CardContent,
	CardHeader,
	Grid,
	Icon,
	List,
	ListItem,
	ListItemText,
	Theme,
	Typography,
	withStyles,
	WithStyles
} from "@material-ui/core"
import { MainContent } from "components"
import { ResponsiveNestedView } from "components/experimental"
import { Link, RouteComponentProps, withRouter } from "react-router-dom"

const styles = (theme: Theme) => ({
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	},
	link: {
		color: "initial",
		textDecoration: "none"
	}
})

interface Pet {
	id: number
	name: string
	type: string
	age: number
}

const pets: Pet[] = [
	{ id: 1, name: "Matti", type: "cat", age: 13 },
	{ id: 2, name: "Ruska", type: "dog", age: 2 },
	{ id: 3, name: "Milli", type: "cat", age: 8 }
]

const NestDemo = ({ classes }: WithStyles) => (
	<>
		<Card>
			<CardContent>
				What you see below is a UI experiment. Try it in both mobile and desktop
				widths.
			</CardContent>
		</Card>
		<List>
			{pets.map((pet) => (
				<Link key={pet.id} className={classes.link} to={"/pets/" + pet.id}>
					<ListItem button>
						<Icon>pets</Icon>
						<ListItemText
							primary={pet.name}
							secondary={`${pet.type}, age ${pet.age}`}
						/>
					</ListItem>
				</Link>
			))}
		</List>
	</>
)

const NestDemoWithStyles = withStyles(styles)(NestDemo)

export const ShowPet = withRouter((props: RouteComponentProps<any>) => {
	const id = props.match.params.id
	const pet = pets.find((p) => p.id + "" === id)

	if (!pet) {
		return <Typography>No pet found for id: {id}</Typography>
	}

	const formattedName = `${pet.name} the ${pet.type}`

	return (
		<ResponsiveNestedView title={formattedName}>
			<MainContent>
				<Grid container spacing={16}>
					<Grid item xs={12}>
						<Card>
							<CardHeader title={pet.name} />
							<CardContent>
								<Typography>{formattedName}</Typography>
								<Typography>Age: {pet.age}</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</MainContent>
		</ResponsiveNestedView>
	)
})

export { NestDemoWithStyles as NestDemo }
