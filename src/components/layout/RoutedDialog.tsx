import * as React from "react"

import { Dialog } from "@material-ui/core"
import { DialogProps } from "@material-ui/core/Dialog"
import { RouteComponentProps, withRouter } from "react-router"

export interface RoutedDialogContext {
	goBack: () => void
}

const { Provider, Consumer } = React.createContext<RoutedDialogContext>(
	null as any
)

export { Consumer as WithRoutedDialogContext }

interface State {
	open: boolean
}

class RoutedDialog extends React.Component<
	Partial<DialogProps> & RouteComponentProps<void>,
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
		const { children, staticContext, ...remainingProps } = this.props
		const { open } = this.state
		return (
			<Dialog open={open} onClose={this.handleClose} {...remainingProps}>
				<Provider value={{ goBack: this.handleClose }}>{children}</Provider>
			</Dialog>
		)
	}
}

const RoutedDialogWithRouter = withRouter(RoutedDialog)
export { RoutedDialogWithRouter as RoutedDialog }
