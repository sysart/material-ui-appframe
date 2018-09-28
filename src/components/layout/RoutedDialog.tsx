import * as React from "react"

import { Dialog } from "@material-ui/core"
import { DialogProps } from "@material-ui/core/Dialog"
import { RouteComponentProps, withRouter } from "react-router"

export interface RoutedDialogProps {
	children: (close: () => void) => any
}

interface State {
	open: boolean
}

class RoutedDialog extends React.Component<
	Partial<DialogProps> & RoutedDialogProps & RouteComponentProps<void>,
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
		const { children } = this.props
		const { open } = this.state
		return (
			<Dialog open={open} onClose={this.handleClose} {...this.props}>
				{children(this.handleClose)}
			</Dialog>
		)
	}
}

const RoutedDialogWithRouter = withRouter(RoutedDialog)
export { RoutedDialogWithRouter as RoutedDialog }
