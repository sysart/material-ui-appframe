import * as React from "react"

import {
	BottomNavigation as MuiBottomNavigation,
	Hidden
} from "@material-ui/core"
import { BottomNavigationProps as MuiBottomNavigationProps } from "@material-ui/core/BottomNavigation"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { WithLegacyCSSLayout } from "../layout/LegacyCSSLayout"
import { MeasureHeight } from "../utilities/MeasureHeight"
import { styled } from "../utilities/styled"

export type BottomNavigationProps = Pick<
	MuiBottomNavigationProps,
	Exclude<keyof MuiBottomNavigationProps, "classes">
> & {
	mobileOnly?: boolean
}

const StyledBottomNavigation = styled(MuiBottomNavigation)({
	gridArea: "bottomnavigation",
	overflowX: "hidden"
})

const StyledBottomNavigationLegacy = styled(MuiBottomNavigation)((theme) => ({
	gridArea: "bottomnavigation",
	[theme.breakpoints.down("sm")]: {
		position: "fixed",
		bottom: 0,
		left: 0,
		right: 0
	}
}))

const Component = (
	props: BottomNavigationProps & RouteComponentProps<void>
) => {
	/**
	 * Don't pass staticContext and classes to BottomNavigation.
	 */
	const { staticContext, mobileOnly, children, ...remainingProps } = props

	/**
	 *
	 * Use the first part of the current path as the selected
	 * value. For example, if a user navigates to "/products/123",
	 * the child with the value "/products" will be highlighted.
	 *
	 */
	const path = "/" + props.location.pathname.split("/")[1]

	return (
		<WithLegacyCSSLayout>
			{({ legacyMobileCssEnabled, setBottomNavigationHeight }) =>
				legacyMobileCssEnabled ? (
					<MeasureHeight reportHeight={setBottomNavigationHeight}>
						<Hidden mdUp={mobileOnly}>
							<StyledBottomNavigationLegacy
								{...remainingProps}
								value={path}
								onChange={(event: unknown, newPath: string) => {
									props.history.push(newPath)
								}}
							>
								{children}
							</StyledBottomNavigationLegacy>
						</Hidden>
					</MeasureHeight>
				) : (
					<Hidden mdUp={mobileOnly}>
						<StyledBottomNavigation
							{...remainingProps}
							value={path}
							onChange={(event: unknown, newPath: string) => {
								props.history.push(newPath)
							}}
						>
							{children}
						</StyledBottomNavigation>
					</Hidden>
				)
			}
		</WithLegacyCSSLayout>
	)
}

/**
 * Bottom navigation for mobile devices. Implements navigation
 * with React router.
 */
const BottomNavigation = withRouter(Component)

export { BottomNavigation }
