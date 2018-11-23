import * as React from "react"

import { Button, Icon, IconButton, Menu as MuiMenu } from "@material-ui/core"
import { ButtonProps } from "@material-ui/core/Button"
import { IconButtonProps } from "@material-ui/core/IconButton"

interface Props {
	title?: string
	icon?: string | React.ReactElement<any>
	children?: ChildFunction | React.ReactNode
	iconButtonProps?: IconButtonProps
	buttonProps?: ButtonProps
}

type ChildFunction = (close: () => void) => React.ReactNode

interface State {
	anchor: HTMLElement | null
}

export class Menu extends React.Component<Props, State> {
	public state = { anchor: null }

	private handleClick = (event: React.MouseEvent<HTMLElement>) => {
		this.setState({ anchor: event.currentTarget })
	}

	private handleClose = () => {
		this.setState({ anchor: null })
	}

	public render() {
		const { title, icon, children, iconButtonProps, buttonProps } = this.props

		let buttonElement: React.ReactNode

		if (icon && !title) {
			// iconButton
			const iconElement = typeof icon === "string" ? <Icon>{icon}</Icon> : icon
			buttonElement = (
				<IconButton onClick={this.handleClick} {...iconButtonProps}>
					{iconElement}
				</IconButton>
			)
		} else {
			// button
			const iconElement = typeof icon === "string" ? <Icon>{icon}</Icon> : icon
			const titleText = title || "Menu"
			buttonElement = (
				<Button onClick={this.handleClick} {...buttonProps}>
					{titleText}
					{iconElement}
				</Button>
			)
		}

		let childElement: React.ReactNode

		// If our children is a function, we render what it returns
		// Otherwise we render our children
		if (typeof children === "function") {
			const c = children as ChildFunction
			const elem: any = c(this.handleClose)
			// If our child functions returns a Fragment, we render its children
			// (because Material UI MenuList warns about not supporting Fragment children)
			if (elem && elem.type === React.Fragment) {
				childElement = elem.props.children
			} else {
				childElement = elem
			}
		} else {
			childElement = children
		}

		return (
			<>
				{buttonElement}
				<MuiMenu
					open={!!this.state.anchor}
					anchorEl={this.state.anchor}
					onClose={this.handleClose}
				>
					{childElement}
				</MuiMenu>
			</>
		)
	}
}
