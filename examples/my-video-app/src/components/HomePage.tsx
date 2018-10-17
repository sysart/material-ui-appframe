import { Divider, Grid, Typography } from "@material-ui/core"
import { MockVideoDataProvider } from "Providers"
import * as React from "react"
import { VideoGridItem } from "./VideoGridItem"

export const HomePage = () => (
	<Grid item container spacing={16}>
		<Grid item>
			<Typography variant="h6">Recommended</Typography>
		</Grid>
		<Grid item container spacing={16}>
			<MockVideoDataProvider>
				{({ videos }) =>
					videos.map((video, index) => (
						<VideoGridItem key={index} video={video} />
					))
				}
			</MockVideoDataProvider>
		</Grid>
		<Grid item>
			<Divider />
		</Grid>
		<Grid item>
			<Typography variant="h6">Recommended</Typography>
		</Grid>
		<Grid item container spacing={16}>
			<MockVideoDataProvider>
				{({ videos }) =>
					videos.map((video, index) => (
						<VideoGridItem key={index} video={video} />
					))
				}
			</MockVideoDataProvider>
		</Grid>
	</Grid>
)
