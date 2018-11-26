import * as React from "react"
import * as ReactDOM from "react-dom"

import { withWidth } from "@material-ui/core"

interface Props<T> {
	default: T
	reportValue: (value: T) => void
	getValue: (domNode: Element | Text) => T
}

class MeasureDOMProperty<T> extends React.Component<Props<T>> {
	private domNode: Element | Text | null = null
	private value: T = this.props.default

	public componentDidMount() {
		this.reportHeight()
	}

	public componentDidUpdate() {
		this.reportHeight()
	}

	private reportHeight() {
		if (!this.domNode) {
			this.domNode = ReactDOM.findDOMNode(this)
			if (!this.domNode) {
				return
			}
		}
		const lastValue = this.value
		this.value = this.props.getValue(this.domNode)
		if (this.value === lastValue) {
			return
		}
		this.props.reportValue(this.value)
	}

	public render() {
		return this.props.children || null
	}
}

// Add withWidth to trigger update on page width change
const MeasureDOMPropertyWithWidthHOC = withWidth()(
	MeasureDOMProperty
) as typeof MeasureDOMProperty

export { MeasureDOMPropertyWithWidthHOC as MeasureDOMProperty }
