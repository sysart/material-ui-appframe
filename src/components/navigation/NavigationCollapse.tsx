import * as React from "react"

import {
	Collapse,
	Icon,
	List,
	ListItem,
	ListItemIcon,
	ListItemText
} from "@material-ui/core"
import { RouteComponentProps, withRouter } from "react-router"
import {
	NavigationLink,
	NavigationLinkProps
} from "../navigation/NavigationLink"
import { styled } from "../utilities/styled"
import {
	NavigationDrawerContext,
	WithNavigationDrawerContext
} from "./Navigation"

const StyledNavigationCollapse = styled(Collapse)((theme) => ({
	backgroundColor:
		theme.palette.primary[theme.palette.type === "dark" ? "dark" : "main"]
}))

const StyledNestedNavigationList = styled(List)((theme) => ({
	paddingLeft: theme.spacing.unit,
	backgroundClip: "content-box",
	backgroundColor: theme.palette.background.paper
}))

interface Props {
	children: JSX.Element | JSX.Element[]
	icon: string
	label: React.ReactNode
}

interface State {
	collapseOpen: boolean
}

interface Context {
	navigationDrawer: NavigationDrawerContext
}

class NavigationCollapse extends React.Component<
	Props & RouteComponentProps<void> & Context,
	State
> {
	public state = {
		collapseOpen: false
	}

	public componentDidMount() {
		if (this.shouldCollapseStartOpen(this.props.children)) {
			this.setState({ collapseOpen: true })
		}
		this.props.navigationDrawer.subscribeToCollapseOpen(this.closeCollapse)
	}

	public componentWillUnmount() {
		this.props.navigationDrawer.unsubscribeFromCollapseOpen(this.closeCollapse)
	}

	private closeCollapse = () => {
		this.setState({ collapseOpen: false })
	}

	/**
	 * Whether or not the collapse should initially be open. The collapse
	 * is open if the user arrives to the application at an endpoint whose
	 * navigation link is inside the collapse menu.
	 */
	private shouldCollapseStartOpen = (children: React.ReactNode) => {
		for (const child of React.Children.toArray(children)) {
			const c = child as any
			if (!c || !c.props) {
				continue
			}
			if (
				c.type === NavigationLink &&
				this.props.location.pathname.startsWith(
					(c.props as NavigationLinkProps).to
				)
			) {
				return true
			}
			if (this.shouldCollapseStartOpen(c.props.children)) {
				return true
			}
		}
		return false
	}

	private handleClick = () => {
		if (this.state.collapseOpen) {
			this.setState({ collapseOpen: false })
		} else {
			this.props.navigationDrawer.collapseOpen()
			this.setState({ collapseOpen: true })
		}
	}

	public render() {
		const { children, icon, label } = this.props
		const { collapseOpen } = this.state
		return (
			<>
				<ListItem button onClick={this.handleClick}>
					<ListItemIcon>
						<Icon>{icon}</Icon>
					</ListItemIcon>
					<ListItemText inset primary={label} />
					{collapseOpen ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
				</ListItem>
				<StyledNavigationCollapse
					in={collapseOpen}
					timeout="auto"
					unmountOnExit
				>
					<StyledNestedNavigationList component="div" disablePadding>
						{children}
					</StyledNestedNavigationList>
				</StyledNavigationCollapse>
			</>
		)
	}
}

const NavigationCollapseWithContext = (
	props: Props & RouteComponentProps<void>
) => (
	<WithNavigationDrawerContext>
		{(context) => <NavigationCollapse {...props} navigationDrawer={context} />}
	</WithNavigationDrawerContext>
)

/**
 * Collapse menu for the navigation drawer. Only one collapse in a drawer can be open at a time.
 */
const NavigationCollapseWithHOC = withRouter(NavigationCollapseWithContext)

export { NavigationCollapseWithHOC as NavigationCollapse }
