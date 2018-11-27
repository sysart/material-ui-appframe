import * as React from "react"

interface Props {
	mount?: boolean
	update?: boolean
	unmount?: boolean
	callback: () => void
}

export class WithLifecycle extends React.Component<Props> {
	public componentDidMount() {
		if (this.props.mount) {
			this.props.callback()
		}
	}

	public componentDidUpdate() {
		if (this.props.update) {
			this.props.callback()
		}
	}

	public componentWillUnmount() {
		if (this.props.unmount) {
			this.props.callback()
		}
	}

	public render() {
		return this.props.children || null
	}
}
