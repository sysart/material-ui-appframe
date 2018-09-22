import {
	classNameBeginsWith,
	getClientRectAndWindow,
	goToPage,
	isHorizScrollable,
	isPageScrollable,
	isVertScrollable
} from "./browserUtils"

describe("AppFrame", () => {
	const appFrameSelector = classNameBeginsWith("AppFrame")

	it("Should never have a horizontal scrollbar", async () => {
		await goToPage("TooWideThings")
		await page.waitForSelector(appFrameSelector)

		const horizScrollable = await isHorizScrollable(appFrameSelector)
		expect(horizScrollable).toBe(false)
	})

	it("Should never have a vertical scrollbar", async () => {
		await goToPage("SimpleScroll")
		await page.waitForSelector(appFrameSelector)

		const vertScrollable = await isVertScrollable(appFrameSelector)
		expect(vertScrollable).toBe(false)
	})

	it("On grid layout, should never cause page (document.body) to be scrollable", async () => {
		await goToPage("SimpleScroll")
		await page.waitForSelector(appFrameSelector)

		const pageScrollable = await isPageScrollable()
		expect(pageScrollable).toBe(false)

		await goToPage("TooWideThings")
		await page.waitForSelector(appFrameSelector)

		const pageScrollable2 = await isPageScrollable()
		expect(pageScrollable2).toBe(false)
	})

	it("On grid layout, should fill exactly the entire viewport", async () => {
		await goToPage("TooWideThings")
		await page.waitForSelector(appFrameSelector)

		const { rect, windowWidth, windowHeight } = await getClientRectAndWindow(
			appFrameSelector
		)

		expect(rect.top).toBe(0)
		expect(rect.left).toBe(0)
		expect(rect.bottom).toBe(windowHeight)
		expect(rect.right).toBe(windowWidth)
	})

	it("On legacy mobile layout, should have top and bottom padding equal to the heights of the AppBar and BottomNavigation respectively, if present", async () => {
		await goToPage("TooWideThingsMobile", "sm")
		await page.waitForSelector(appFrameSelector)
		const { paddingTop, paddingBottom } = await page.$eval(
			appFrameSelector,
			(appFrame) => {
				const style = getComputedStyle(appFrame)
				return {
					paddingTop: style["padding-top"],
					paddingBottom: style["padding-bottom"]
				}
			}
		)
		expect(paddingTop).toBe("64px")
		expect(paddingBottom).toBe("0px")

		await goToPage("LegacyMobileScroll", "xs")
		await page.waitForSelector(appFrameSelector)

		const { paddingTop2, paddingBottom2 } = await page.$eval(
			appFrameSelector,
			(appFrame) => {
				const style = getComputedStyle(appFrame)
				return {
					paddingTop2: style["padding-top"],
					paddingBottom2: style["padding-bottom"]
				}
			}
		)
		expect(paddingTop2).toBe("56px")
		expect(paddingBottom2).toBe("56px")
	})

	it("On legacy mobile layout, should grow higher than viewport when there is a lot of main content", async () => {
		await goToPage("LegacyMobileScroll", "xs")
		await page.waitForSelector(appFrameSelector)

		const { rect, windowWidth, windowHeight } = await getClientRectAndWindow(
			appFrameSelector
		)

		expect(rect.top).toBe(0)
		expect(rect.left).toBe(0)
		expect(rect.bottom).toBeGreaterThan(windowHeight)
		expect(rect.right).toBe(windowWidth)
	})
})
