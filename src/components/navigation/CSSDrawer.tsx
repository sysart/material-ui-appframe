import * as React from "react"
import * as ReactDOM from "react-dom"

import { Paper, withWidth } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles"
import { WithWidth } from "@material-ui/core/withWidth"
import returnof from "returnof"

interface Props {
	drawerWidth: number
	open: boolean
	onOpen: () => void
	onClose: () => void
}
// BEGIN STYLES
const styles = () => ({
	backdrop: {
		zIndex: 9990,
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		background: "black"
	} as CSSProperties,

	container: {
		position: "fixed",
		zIndex: 10000,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	} as CSSProperties,

	draggable: {
		position: "relative",
		display: "flex",
		height: "100%"
	} as CSSProperties,

	dragHandle: {
		width: 15
	} as CSSProperties,

	movable: {
		position: "absolute",
		top: 0,
		bottom: 20
	} as CSSProperties,

	paper: {
		height: "100%",
		overflowY: "auto"
	} as CSSProperties,

	scrollable: {
		position: "absolute",
		zIndex: 10000,
		top: 0,
		bottom: -20,
		left: 0,
		right: 0,
		overflowY: "hidden",
		overflowX: "scroll",
		scrollSnapType: "x mandatory" as any
	} as CSSProperties,

	scrollSnapStart: {
		pointerEvents: "none",
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		scrollSnapAlign: "start"
	} as CSSProperties,

	scrollSnapEnd: {
		pointerEvents: "none",
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		scrollSnapAlign: "end"
	} as CSSProperties
})

const returnType = returnof(styles)
type ClassNames = keyof typeof returnType
// END STYLES

class CSSDrawerImpl extends React.Component<
	Props & WithStyles<ClassNames, true> & WithWidth
> {
	private scrollElement: any
	private backdrop: any
	private container: any

	private scrollPosition: number = 0

	private canMinimizeContainer: boolean

	private dragging: boolean = false
	private ticking: boolean = false

	private rtl: boolean = false

	public componentDidMount() {
		this.canMinimizeContainer = !this.props.open

		this.rtl = !!(this.props.theme && this.props.theme.direction === "rtl")
		this.minimizeContainer()
	}

	public componentDidUpdate(
		prevProps: Props & WithStyles<ClassNames, true> & WithWidth
	) {
		this.rtl = !!(this.props.theme && this.props.theme.direction === "rtl")

		const prevRtl = !!(prevProps.theme && prevProps.theme.direction === "rtl")

		if (this.props.width !== prevProps.width) {
			this.scrollElement.scrollLeft = this.props.open
				? this.getNormalizedPosition(this.props.drawerWidth)
				: this.getNormalizedPosition(0)
		}

		if (this.rtl !== prevRtl) {
			this.scrollElement.scrollLeft =
				this.props.drawerWidth - this.scrollElement.scrollLeft
		}

		if (this.props.open && !prevProps.open) {
			this.openDrawer()
		} else if (!this.props.open && prevProps.open) {
			this.closeDrawer()
		}
	}

	private openDrawer = () => {
		this.unMinimizeContainer()
		this.scrollElement.scroll({
			left: this.getNormalizedPosition(this.props.drawerWidth),
			behavior: "smooth"
		})
	}

	private closeDrawer = () => {
		this.scrollElement.scroll({
			left: this.getNormalizedPosition(0),
			behavior: "smooth"
		})
	}

	private minimizeContainer = () => {
		requestAnimationFrame(() => {
			if (!this.canMinimizeContainer) {
				return
			}
			this.container.style.width = "15px"
			this.scrollElement.scrollLeft = this.getNormalizedPosition(0)
		})
	}

	private unMinimizeContainer = () => {
		requestAnimationFrame(() => {
			this.container.style.width = ""
		})
	}

	private startDragging = (event: React.TouchEvent<HTMLDivElement>) => {
		event.stopPropagation()

		if (this.dragging) {
			return
		}
		this.dragging = true
		this.canMinimizeContainer = false
		this.unMinimizeContainer()
	}

	private stopDragging = (event: React.TouchEvent<HTMLDivElement>) => {
		event.stopPropagation()

		this.dragging = false
		this.checkIfStoppedMoving()
	}

	private checkIfStoppedMoving = () => {
		if (this.dragging) {
			return
		}
		const scrollPosition = this.getNormalizedPosition(this.scrollPosition)
		if (scrollPosition === this.props.drawerWidth) {
			this.unMinimizeContainer()
			if (!this.props.open) {
				// console.log("Firing onOpen")
				this.props.onOpen()
			}
		} else if (scrollPosition === 0) {
			this.canMinimizeContainer = true
			this.minimizeContainer()
			if (this.props.open) {
				// console.log("Firing onClose")
				this.props.onClose()
			}
		}
	}

	private handleScroll = () => {
		this.canMinimizeContainer = false
		this.scrollPosition = this.scrollElement.scrollLeft

		if (!this.backdrop) {
			return
		}
		if (this.ticking) {
			return
		}

		this.ticking = true
		requestAnimationFrame(() => {
			this.backdrop.style.opacity =
				this.getNormalizedPosition(this.scrollPosition) /
				(this.props.drawerWidth * 2)
			this.checkIfStoppedMoving()

			this.ticking = false
		})
	}

	/**
	 *
	 * Drawer fully hidden => 0,
	 * Drawer fully visible => DRAWER_WIDTH
	 *
	 * @param scrollPosition scrollLeft value of the scrollable div
	 */
	private getNormalizedPosition(scrollPosition: number) {
		if (this.rtl) {
			return scrollPosition
		}
		return this.props.drawerWidth - scrollPosition
	}

	private setContainer = (elem: HTMLDivElement | null) => {
		this.container = elem && ReactDOM.findDOMNode(elem)
	}

	private setBackdrop = (elem: HTMLDivElement | null) => {
		this.backdrop = elem && ReactDOM.findDOMNode(elem)
	}

	private setScrollElement = (elem: HTMLDivElement | null) => {
		this.scrollElement = elem && ReactDOM.findDOMNode(elem)
	}

	public render() {
		const { classes } = this.props
		return (
			<div className={classes.container} ref={this.setContainer}>
				<div
					className={classes.backdrop}
					style={{ opacity: 0 }}
					ref={this.setBackdrop}
				/>
				<div
					className={classes.scrollable}
					ref={this.setScrollElement}
					onScroll={this.handleScroll}
				>
					<div
						className={classes.movable}
						style={{
							width: `calc(100% + ${this.props.drawerWidth}px)`
						}}
						onTouchStart={this.startDragging}
						onTouchCancel={this.stopDragging}
						onTouchEnd={this.stopDragging}
						onClick={() => {
							this.closeDrawer()
						}}
					>
						<div className={classes.draggable}>
							<DrawerContents drawerOpen={this.props.open}>
								<Paper
									className={classes.paper}
									style={{ width: this.props.drawerWidth }}
									square
									onClick={(event) => {
										// stop menu clicks from propagating to parent and closing drawer
										// (e.g. expanding a navigation collapse should not close the drawer)
										event.stopPropagation()
									}}
								>
									{this.props.children}
								</Paper>
							</DrawerContents>
							<div
								className={classes.dragHandle}
								// This is a hack to make it work for some reason :/
								// tslint:disable-next-line:no-empty
								onClick={() => {}}
							/>
						</div>
						<div className={classes.scrollSnapStart} />
						<div className={classes.scrollSnapEnd} />
					</div>
				</div>
			</div>
		)
	}
}

interface DrawerContentsProps {
	drawerOpen: boolean
	children: React.ReactNode
}

// tslint:disable-next-line:max-classes-per-file
class DrawerContents extends React.Component<DrawerContentsProps> {
	public shouldComponentUpdate(nextProps: DrawerContentsProps) {
		if (!this.props.drawerOpen && !nextProps.drawerOpen) {
			return false
		}
		return true
	}
	public render() {
		return this.props.children
	}
}

export const CSSDrawer = withWidth()(
	withStyles(styles, { withTheme: true })(CSSDrawerImpl)
)
