import * as React from "react"

import {
	BottomNavigation as MuiBottomNavigation,
	Hidden
} from "@material-ui/core"
import { BottomNavigationProps as MuiBottomNavigationProps } from "@material-ui/core/BottomNavigation"
import { MeasureDOMProperty } from "components/utilities/MeasureDOMProperty"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { WithAppFrameContext } from "../layout/AppFrame"
import { styled } from "../utilities/styled"

export type BottomNavigationProps = Pick<
	MuiBottomNavigationProps,
	Exclude<keyof MuiBottomNavigationProps, "classes">
> & {
	mobileOnly?: boolean
}

const BottomNavigation = (
	props: BottomNavigationProps & RouteComponentProps<void>
) => {
	/**
	 *
	 * Use the first part of the current path as the selected
	 * value. For example, if a user navigates to "/products/123",
	 * the child with the value "/products" will be highlighted.
	 *
	 */
	const path = "/" + props.location.pathname.split("/")[1]

	return (
		<WithAppFrameContext>
			{({
				setBottomNavigationHeight,
				navigationDrawerWidth,
				useGridLayout
			}) => (
				<Hidden mdUp={props.mobileOnly}>
					{useGridLayout
						? renderGrid(props, path)
						: renderStandard(
								props,
								path,
								navigationDrawerWidth,
								setBottomNavigationHeight
						  )}
				</Hidden>
			)}
		</WithAppFrameContext>
	)
}

const renderStandard = (
	props: BottomNavigationProps & RouteComponentProps<void>,
	path: string,
	navigationDrawerWidth: number,
	setBottomNavigationHeight: (height: number) => void
) => {
	/**
	 * Don't pass staticContext and classes to BottomNavigation.
	 */
	const { staticContext, mobileOnly, children, ...remainingProps } = props
	return (
		<MeasureDOMProperty
			default={0}
			getValue={(elem: any) => (elem.clientHeight as number) || 0}
			reportValue={setBottomNavigationHeight}
		>
			<BottomNavigationStandard
				{...remainingProps}
				value={path}
				onChange={(event: unknown, newPath: string) => {
					props.history.push(newPath)
				}}
				style={{ left: navigationDrawerWidth }}
			>
				{children}
			</BottomNavigationStandard>
		</MeasureDOMProperty>
	)
}

const BottomNavigationStandard = styled(MuiBottomNavigation)({
	position: "fixed",
	bottom: 0,
	left: 0,
	right: 0
})

const renderGrid = (
	props: BottomNavigationProps & RouteComponentProps<void>,
	path: string
) => {
	/**
	 * Don't pass staticContext and classes to BottomNavigation.
	 */
	const { staticContext, mobileOnly, children, ...remainingProps } = props
	return (
		<BottomNavigationGrid
			{...remainingProps}
			value={path}
			onChange={(event: unknown, newPath: string) => {
				props.history.push(newPath)
			}}
		>
			{children}
		</BottomNavigationGrid>
	)
}

const BottomNavigationGrid = styled(MuiBottomNavigation)({
	gridArea: "bottomnavigation",
	overflowX: "hidden"
})

/**
 * Bottom navigation for mobile devices. Implements navigation
 * with React router.
 */
const BottomNavigationWithRouter = withRouter(BottomNavigation)

export { BottomNavigationWithRouter as BottomNavigation }
