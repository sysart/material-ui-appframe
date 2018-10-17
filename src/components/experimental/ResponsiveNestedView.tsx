import * as React from "react"

import { Typography, withWidth } from "@material-ui/core"
import { WithWidth } from "@material-ui/core/withWidth"
import { RouteComponentProps, withRouter } from "react-router"
import { DesktopDialog } from "../extraComponents/DesktopDialog"
import { MobileActivity } from "../extraComponents/MobileActivity"
import { TitleBar } from "../extraComponents/titleBar/TitleBar"
import { UpNavigationButton } from "../extraComponents/titleBar/UpNavigationButton"
import { MainContent } from "../layout/MainContent"

interface Props {
	title: string
	children: React.ReactNode
}

class ResponsiveNestedView extends React.Component<
	Props & RouteComponentProps<void> & WithWidth
> {
	public render() {
		const { children, title, width } = this.props
		if (width === "xs") {
			return (
				<MobileActivity>
					<TitleBar>
						<UpNavigationButton />
						<Typography variant="h6" color="inherit" style={{ flex: 1 }}>
							{title}
						</Typography>
					</TitleBar>
					<MainContent>{children}</MainContent>
				</MobileActivity>
			)
		}
		return (
			<DesktopDialog>
				<TitleBar>
					<Typography variant="h6" color="inherit" style={{ flex: 1 }}>
						{title}
					</Typography>
					<UpNavigationButton icon="close" />
				</TitleBar>
				<MainContent>{children}</MainContent>
			</DesktopDialog>
		)
	}
}

const ComponentWithRouter = withWidth()(withRouter(ResponsiveNestedView))

export { ComponentWithRouter as ResponsiveNestedView }
