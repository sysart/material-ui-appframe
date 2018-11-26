import * as React from "react"

import { Icon, Input, Paper } from "@material-ui/core"
import { styled } from "../../utilities/styled"

interface TitleBarSearchProps {
	autoFocus?: boolean
}

const TitleBarSearchContainer = styled("div")({
	flex: 1,
	margin: 10
})

const TitleBarSearchPaper = styled(Paper)({
	display: "flex",
	flex: 1,
	alignItems: "center",
	margin: "auto",
	maxWidth: 500
})

const TitleBarInput = styled(Input)({
	flex: 1
})

const StyledIcon = styled(Icon)((theme) => ({
	color: theme.palette.grey["500"],
	margin: 4
}))

/**
 * Currently for illustration purposes only. Not a final implementation.
 */
export const TitleBarSearch = (props: TitleBarSearchProps) => (
	<TitleBarSearchContainer
	/*
	 * The container keeps growing after the inner Paper has reached
	 * its maximum width, pushing any elements placed after this one to the right
	 */
	>
		<TitleBarSearchPaper>
			<StyledIcon>search</StyledIcon>
			<TitleBarInput
				autoFocus={props.autoFocus}
				disableUnderline
				placeholder="Search..."
				id="docsearch-input"
			/>
		</TitleBarSearchPaper>
	</TitleBarSearchContainer>
)
