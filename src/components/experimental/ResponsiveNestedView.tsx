import * as React from "react"

import {
	AppBar,
	Icon,
	IconButton,
	Toolbar,
	Typography,
	withWidth
} from "@material-ui/core"
import { WithWidth } from "@material-ui/core/withWidth"
import { RouteComponentProps, withRouter } from "react-router"
import { DesktopDialog } from "../extraComponents/DesktopDialog"
import { MobileActivity } from "../extraComponents/MobileActivity"

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
					{(closeDialog) => (
						<>
							<AppBar style={{ position: "relative" }}>
								<Toolbar>
									<IconButton
										color="inherit"
										onClick={closeDialog}
										aria-label="Close"
									>
										<Icon>arrow_back</Icon>
									</IconButton>
									<Typography
										variant="title"
										color="inherit"
										style={{ flex: 1 }}
									>
										{title}
									</Typography>
								</Toolbar>
							</AppBar>
							{children}
						</>
					)}
				</MobileActivity>
			)
		}
		return (
			<DesktopDialog>
				{(closeDialog) => (
					<>
						<AppBar style={{ position: "relative" }}>
							<Toolbar>
								<Typography variant="title" color="inherit" style={{ flex: 1 }}>
									{title}
								</Typography>
								<IconButton
									color="inherit"
									onClick={closeDialog}
									aria-label="Close"
								>
									<Icon>close</Icon>
								</IconButton>
							</Toolbar>
						</AppBar>
						{children}
					</>
				)}
			</DesktopDialog>
		)
	}
}

const ComponentWithRouter = withWidth()(withRouter(ResponsiveNestedView))

export { ComponentWithRouter as ResponsiveNestedView }
