import * as React from "react"

import { withStyles } from "@material-ui/core"
import { Theme } from "@material-ui/core/styles"
import { CSSProperties } from "@material-ui/core/styles/withStyles"
import classNames from "classnames"

type StyleFunction = (theme: Theme) => CSSProperties

type StyledHtml = <T extends keyof JSX.IntrinsicElements>(
	component: T,
	styles: StyleFunction
) => (
	props: JSX.IntrinsicElements[T]
) => React.ReactElement<JSX.IntrinsicElements[T]>

type CurriedStyledHtml = <T extends keyof JSX.IntrinsicElements>(
	component: T
) => ((
	styles: StyleFunction
) => ((
	props: JSX.IntrinsicElements[T]
) => React.ReactElement<JSX.IntrinsicElements[T]>))

type StyledComponent = <T = {}>(
	component: React.ComponentType<T>,
	styles: StyleFunction
) => (props: T) => React.ReactElement<T>

type CurriedStyledComponent = <T = {}>(
	component: React.ComponentType<T>
) => ((styles: StyleFunction) => ((props: T) => React.ReactElement<T>))

const styledImpl: StyledHtml & StyledComponent = (
	component: any,
	styles: StyleFunction
) => {
	const styleCallback = (theme: Theme) => ({
		styled: styles(theme)
	})

	return withStyles(styleCallback)((props: any) => {
		const { classes, className, innerRef, theme, ...remainingProps } = props
		const { styled, ...remainingClasses } = classes
		const elementProps = {
			className: classNames(styled, props.className), // combine class names to allow overriding styles
			classes: remainingClasses, // pass classes to allow overriding styles (currently causes warning)
			...remainingProps
		}
		return React.createElement(component, elementProps)
	}) as any
}

const curriedStyledImpl: CurriedStyledHtml & CurriedStyledComponent = (
	component: any
) => styledImpl.bind(undefined, component)

export { curriedStyledImpl as styled }
