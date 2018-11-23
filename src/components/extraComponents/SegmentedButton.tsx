import { styled } from "../utilities/styled"

import { Button } from "@material-ui/core"

export const SegmentedButton = styled(Button)(() => ({
	padding: "4px 16px",
	minHeight: 28,

	flex: 1,
	border: "1px solid gray",
	borderLeft: "0px",
	borderRadius: "0px",
	"&:first-child": {
		border: "1px solid gray",
		borderTopLeftRadius: "4px",
		borderBottomLeftRadius: "4px"
	},
	"&:last-child": {
		borderTopRightRadius: "4px",
		borderBottomRightRadius: "4px"
	}
}))
