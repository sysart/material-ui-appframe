import * as React from "react"

import {
	AppBar,
	Dialog,
	Fade,
	Icon,
	IconButton,
	Slide,
	Toolbar,
	Typography,
	withWidth
} from "@material-ui/core"
import { SlideProps } from "@material-ui/core/Slide"
import { WithWidth } from "@material-ui/core/withWidth"
import { RouteComponentProps, withRouter } from "react-router"

interface Props {
	title: string
	children: React.ReactNode
}

interface State {
	open: boolean
}

class ResponsiveNestedView extends React.Component<
	Props & RouteComponentProps<void> & WithWidth,
	State
> {
	public state = { open: true }

	private handleClose = () => {
		this.setState({ open: false }, () => {
			window.setTimeout(() => {
				const path = this.props.location.pathname
				this.props.history.push(path.substring(0, path.lastIndexOf("/")))
			}, 200)
		})
	}

	public render() {
		const { children, title, width } = this.props
		if (width === "xs") {
			return (
				<Dialog
					fullScreen
					open={this.state.open}
					onClose={this.handleClose}
					TransitionComponent={MobileTransition}
				>
					<AppBar style={{ position: "relative" }}>
						<Toolbar>
							<IconButton
								color="inherit"
								onClick={this.handleClose}
								aria-label="Close"
							>
								<Icon>arrow_back</Icon>
							</IconButton>
							<Typography variant="title" color="inherit" style={{ flex: 1 }}>
								{title}
							</Typography>
						</Toolbar>
					</AppBar>
					{children}
				</Dialog>
			)
		}
		return (
			<Dialog
				open={this.state.open}
				onClose={this.handleClose}
				TransitionComponent={Fade}
				fullWidth
			>
				<AppBar style={{ position: "relative" }}>
					<Toolbar>
						<Typography variant="title" color="inherit" style={{ flex: 1 }}>
							{title}
						</Typography>
						<IconButton
							color="inherit"
							onClick={this.handleClose}
							aria-label="Close"
						>
							<Icon>close</Icon>
						</IconButton>
					</Toolbar>
				</AppBar>
				{children}
			</Dialog>
		)
	}
}

const MobileTransition = (props: SlideProps) => (
	<Slide direction="left" {...props} />
)

const ComponentWithRouter = withWidth()(withRouter(ResponsiveNestedView))

export { ComponentWithRouter as ResponsiveNestedView }
