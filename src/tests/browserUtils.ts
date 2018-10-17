const renderLayout = (layout: string) =>
	page.evaluate(`renderLayout("${layout}")`)

export type breakpoint = "xs" | "sm" | "md" | "lg" | "xl"

// example widths of a given breakpoint
const widths: Record<breakpoint, number> = {
	xs: 400,
	sm: 640,
	md: 1000,
	lg: 1400,
	xl: 2000
}

export const setWidth = (width: breakpoint) =>
	page.setViewport({ width: widths[width], height: 600 })

export const classNameBeginsWith = (className: string) =>
	`[class^='${className}'], [class*=' ${className}']`

export const isPageScrollable = () =>
	page.evaluate(
		() =>
			document.body.scrollHeight > document.body.clientHeight ||
			document.body.scrollWidth > document.body.clientWidth
	)

export const isHorizScrollable = (selector: string) =>
	page.$eval(selector, (elem: HTMLElement) => {
		const style = getComputedStyle(elem)
		return elem.scrollWidth > elem.offsetWidth && style.overflowX !== "hidden"
	})

export const isVertScrollable = (selector: string) =>
	page.$eval(selector, (elem: HTMLElement) => {
		const style = getComputedStyle(elem)
		return elem.scrollHeight > elem.offsetHeight && style.overflowY !== "hidden"
	})

export const isScrollable = (selector: string) =>
	page.$eval(selector, (elem: HTMLElement) => {
		const style = getComputedStyle(elem)
		const horizScrollable =
			elem.scrollWidth > elem.offsetWidth && style.overflowX !== "hidden"
		const vertScrollable =
			elem.scrollHeight > elem.offsetHeight && style.overflowY !== "hidden"
		return horizScrollable || vertScrollable
	})

export const getWindowDimensions: () => Promise<{
	innerHeight: number
	innerWidth: number
	scrollX: number
	scrollY: number
}> = () =>
	page.evaluate(() => ({
		innerHeight: window.innerHeight,
		innerWidth: window.innerWidth,
		scrollX: window.scrollX,
		scrollY: window.scrollY
	}))

export const getClientRect = (selector: string) =>
	page.$eval(selector, (element) => {
		const clientRect = element.getBoundingClientRect()
		return {
			top: clientRect.top,
			bottom: clientRect.bottom,
			left: clientRect.left,
			right: clientRect.right,
			height: clientRect.height,
			width: clientRect.width
		}
	})

export const getClientRectAndWindow = (selector: string) =>
	page.$eval(selector, (element) => {
		const clientRect = element.getBoundingClientRect()
		return {
			rect: {
				top: clientRect.top,
				bottom: clientRect.bottom,
				left: clientRect.left,
				right: clientRect.right
			},
			windowHeight:
				(document.documentElement && document.documentElement.clientHeight) ||
				0,
			windowWidth:
				(document.documentElement && document.documentElement.clientWidth) || 0,
			scrollX: window.scrollX,
			scrollY: window.scrollY
		}
	})

export const goToPage = (
	layout: string = "SimpleLayout",
	width: breakpoint = "lg",
	url: string = "/"
) => {
	return page
		.goto("http://localhost:3001" + url, {
			waitUntil: "networkidle0",
			timeout: 60000
		})
		.then(() => setWidth(width))
		.then(() => renderLayout(layout))
}

const disableScrollSnap = () =>
	page.evaluate(
		`CSS.supports = (query) => (query=="scroll-snap-align: start" ? false : CSS.supports.apply(null, arguments))`
	)

// For testing in the future
// tslint:disable-next-line:no-unused-expression
disableScrollSnap
