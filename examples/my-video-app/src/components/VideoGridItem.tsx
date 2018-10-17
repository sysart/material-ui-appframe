import * as React from "react"

import {
	Grid,
	Hidden,
	Icon,
	IconButton,
	Paper,
	Typography
} from "@material-ui/core"
import { colors } from "@material-ui/core"
import { styled } from "material-ui-appframe/utilities"
import { Video } from "mockVideoData"
import * as moment from "moment"

interface VideoGridItemProps {
	video: Video
}

const FakeThumbnail = styled(Paper)(() => ({
	paddingBottom: "55%"
}))

const VideoDetails = styled("div")(() => ({
	display: "flex",
	flexDirection: "row",
	paddingTop: 4
}))

const AuthorAvatar = styled(IconButton)(() => ({
	margin: 6
}))

const VideoTitle = styled(Typography)(() => ({
	fontSize: "1.0rem",
	fontWeight: 500
}))

const VideoSubheading = styled(Typography)((theme) => ({
	fontSize: "0.9rem",
	color: theme.palette.grey["700"],
	fontWeight: 100
}))

export const VideoGridItem = ({ video }: VideoGridItemProps) => (
	<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
		<FakeThumbnail
			style={{
				backgroundColor: getRandomLightColor()
			}}
		/>
		<VideoDetails>
			<Hidden mdUp>
				<AuthorAvatar
					style={{
						backgroundColor: getRandomLightColor()
					}}
				>
					<Icon>person</Icon>
				</AuthorAvatar>
			</Hidden>
			<div>
				<VideoTitle variant="h6">{video.title}</VideoTitle>
				<VideoSubheading variant="subtitle1">
					{video.uploadedBy}
				</VideoSubheading>
				<VideoSubheading variant="subtitle1">
					{`${abbreviateNumber(video.viewCount)} views • ${moment(
						video.uploadDate
					).fromNow()}`}
				</VideoSubheading>
			</div>
		</VideoDetails>
	</Grid>
)

const symbol = ["", "K", "M", "G", "T", "P", "E"]

function abbreviateNumber(n: number): string {
	// tslint:disable-next-line:no-bitwise
	const tier = (Math.log10(n) / 3) | 0
	if (tier === 0) {
		return n + ""
	}
	const suffix = symbol[tier]
	const scale = Math.pow(10, tier * 3)
	const scaled = n / scale
	return scaled.toFixed(1) + suffix
}

/**
 * Get a random light color for illustration purposes
 */
const getRandomLightColor = () => {
	const colorNames = Object.keys(colors).filter(
		(name) => name !== "grey" && name !== "common"
	)
	const numColors = colorNames.length
	const colorNumber = Math.floor(Math.random() * numColors)
	const colorName = colorNames[colorNumber]
	return colors[colorName][50]
}
