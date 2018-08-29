import * as React from "react"
import * as ReactDOM from "react-dom"

import { withWidth } from "@material-ui/core"
import { WithWidth } from "@material-ui/core/withWidth"

interface Props {
	reportHeight: (height: number) => void
}

class MeasureHeight extends React.Component<Props & WithWidth> {
	private domNode: any
	private height: number

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
		const lastHeight = this.height
		this.height = this.getHeight()
		if (this.height === lastHeight) {
			return
		}
		this.props.reportHeight(this.height)
	}

	private getHeight(): number {
		return (this.domNode as any).clientHeight || 0
	}

	public render() {
		return this.props.children
	}
}

// Add withWidth to trigger update on page width change
const MeasureHeightWithWidthHOC = withWidth()(MeasureHeight)

export { MeasureHeightWithWidthHOC as MeasureHeight }
