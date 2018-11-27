import {
	classNameBeginsWith,
	getClientRectAndWindow,
	goToPage,
	isHorizScrollable,
	isVertScrollable
} from "./browserUtils"

describe("AppBar", () => {
	const appBarSelector = classNameBeginsWith("MuiAppBar")

	it("Should render a <header> html tag", async () => {
		await goToPage("StandardSimple")
		await page.waitForSelector(appBarSelector)

		const tagName = await page.$eval(appBarSelector, (appBar) => {
			return appBar.tagName.toLowerCase()
		})
		expect(tagName).toBe("header")
	})

	it("Should be positioned at the top of the viewport", async () => {
		await goToPage("TooWideThingsGrid")
		await page.waitForSelector(appBarSelector)

		const { rect, windowWidth } = await getClientRectAndWindow(appBarSelector)

		expect(rect.top).toBe(0)
		expect(rect.left).toBe(0)
		expect(rect.right).toBe(windowWidth)
	})

	it("On standard css layout, should be positioned at the top of the viewport when scrolling", async () => {
		await goToPage("StandardScroll", "xs")
		await page.waitForSelector(appBarSelector)
		await page.evaluate(() => {
			window.scrollBy(0, 300)
		})

		const { rect, windowWidth, scrollY } = await getClientRectAndWindow(
			appBarSelector
		)

		expect(rect.top).toBe(0)
		expect(rect.left).toBe(0)
		expect(rect.right).toBe(windowWidth)
		expect(scrollY).toBe(300)
	})

	it("Should never have a scrollbar", async () => {
		await goToPage("TooWideThingsGrid")
		await page.waitForSelector(appBarSelector)

		const horizScrollable = await isHorizScrollable(appBarSelector)
		expect(horizScrollable).toBe(false)

		const vertScrollable = await isVertScrollable(appBarSelector)
		expect(vertScrollable).toBe(false)
	})
})
