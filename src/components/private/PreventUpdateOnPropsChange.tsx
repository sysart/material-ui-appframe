/*import * as React from "react"

import { AppFrameContext, WithAppFrameContext } from "../layout/AppFrame"

export class PreventUpdateOnPropsChange extends React.Component<any> {
	public shouldComponentUpdate(nextProps: any) {
		const { children, ...remainingProps } = nextProps
		return !this.okToNotUpdate(remainingProps)
	}

	private okToNotUpdate(nextProps: object) {
		for (const key in nextProps) {
			if (this.props[key] !== nextProps[key]) {
				return true
			}
		}
		return false
	}

	public render() {
		return this.props.children
	}
}

// tslint:disable-next-line:max-classes-per-file
class PreventUpdateWhenAppDrawerOpenImpl extends React.Component<
	AppFrameContext
> {
	public shouldComponentUpdate() {
		return !this.props.navigationDrawerOpen
	}

	public render() {
		return this.props.children
	}
}

export const PreventUpdateWhenAppDrawerOpen = (props: {
	children: React.ReactNode
}) => (
	<WithAppFrameContext>
		{(context) => (
			<PreventUpdateWhenAppDrawerOpenImpl {...context}>
				{props.children}
			</PreventUpdateWhenAppDrawerOpenImpl>
		)}
	</WithAppFrameContext>
)

export const PreventUpdateOnAppDrawerToggle = (props: { children: any }) => (
	<WithAppFrameContext>
		{({ navigationDrawerOpen }) => (
			<PreventUpdateOnPropsChange navigationDrawerOpen={navigationDrawerOpen}>
				{props.children}
			</PreventUpdateOnPropsChange>
		)}
	</WithAppFrameContext>
)*/
