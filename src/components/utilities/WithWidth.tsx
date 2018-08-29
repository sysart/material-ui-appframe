import * as React from "react"
// tslint:disable-next-line:no-unused-expression
React

import { withWidth } from "@material-ui/core"
import { WithWidth as WithWidthProps } from "@material-ui/core/withWidth"

interface Props {
	children: (props: WithWidthProps) => any
}

export const WithWidth = withWidth()((props: Props & WithWidthProps) => {
	const { children, ...remainingProps } = props
	return children(remainingProps)
})
