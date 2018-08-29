import * as React from "react"

import { Typography } from "@material-ui/core"
import { TypographyProps } from "@material-ui/core/Typography"
import { styled } from "../../utilities/styled"

const StyledTypography = styled(Typography)(() => ({
	cursor: "default"
}))

/**
 * Title component works exactly like
 * <Typography variant="title" color="inherit" noWrap>
 * except that it also sets document.title accordingly.
 */
export class Title extends React.Component<TypographyProps> {
	private lastTitle: string

	public componentDidMount() {
		this.updateTitle()
	}

	public componentDidUpdate() {
		this.updateTitle()
	}

	public updateTitle() {
		const title = this.props.children + ""
		if (title === this.lastTitle) {
			return
		}
		this.lastTitle = title
		document.title = title
	}

	public render() {
		return (
			<StyledTypography
				variant="title"
				color="inherit"
				noWrap
				{...this.props}
			/>
		)
	}
}
