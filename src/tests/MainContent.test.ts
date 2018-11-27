import {
	classNameBeginsWith,
	getClientRect,
	getClientRectAndWindow,
	getWindowDimensions,
	goToPage,
	isHorizScrollable,
	isScrollable
} from "./browserUtils"

describe("MainContent", () => {
	const mainContentSelector = "main"

	it("Should render a <main> html tag", async () => {
		await goToPage("SimpleGridLayout")
		await page.waitForSelector(mainContentSelector)

		const { tagName, text } = await page.$eval(
			mainContentSelector,
			(mainContent) => {
				return {
					tagName: mainContent.tagName.toLowerCase(),
					text: mainContent.textContent
				}
			}
		)
		expect(tagName).toBe("main") // duh
		expect(text).toContain("Sample text")
	})

	it("Should never grow wider than viewport", async () => {
		await goToPage("TooWideThingsGrid")
		await page.waitForSelector(mainContentSelector)

		const { rect, windowWidth } = await getClientRectAndWindow(
			mainContentSelector
		)

		expect(rect.right).toBe(windowWidth)

		const horizScrollable = await isHorizScrollable(mainContentSelector)
		expect(horizScrollable).toBe(true)
	})

	it("Should be positioned directly below the AppBar and above the BottomNavigation", async () => {
		await goToPage("SimpleGridLayout")
		await page.waitForSelector(mainContentSelector)

		const mainContentRect = await getClientRect(mainContentSelector)
		const appBarRect = await getClientRect(classNameBeginsWith("MuiAppBar"))
		const windowDimensions = await getWindowDimensions()

		expect(appBarRect.top).toBe(0)
		expect(mainContentRect.top).toBe(appBarRect.height)

		const bottomNavigationRect = await getClientRect(
			classNameBeginsWith("MuiBottomNavigation")
		)

		expect(bottomNavigationRect.bottom).toBe(windowDimensions.innerHeight)
		expect(mainContentRect.bottom).toBe(bottomNavigationRect.top)

		expect(
			appBarRect.height + mainContentRect.height + bottomNavigationRect.height
		).toBe(windowDimensions.innerHeight)
	})

	it("On standard css layout, it should be positioned directly below the AppBar when page scrolled to top", async () => {
		await goToPage("StandardScroll", "xs")
		await page.waitForSelector(mainContentSelector)

		const mainContentRect = await getClientRect(mainContentSelector)
		const appBarRect = await getClientRect(classNameBeginsWith("MuiAppBar"))

		expect(appBarRect.top).toBe(0)
		expect(mainContentRect.top).toBe(appBarRect.height)
	})

	it("On standard css layout, it should be positioned directly above the BottomNavigation when page scrolled to bottom", async () => {
		await goToPage("StandardScroll", "xs")
		await page.waitForSelector(mainContentSelector)

		await page.evaluate(`window.scrollTo(0, document.body.scrollHeight)`)

		const windowDimensions = await getWindowDimensions()

		const mainContentRect = await getClientRect(mainContentSelector)
		const bottomNavigationRect = await getClientRect(
			classNameBeginsWith("MuiBottomNavigation")
		)
		expect(bottomNavigationRect.bottom).toBe(windowDimensions.innerHeight)
		expect(mainContentRect.bottom).toBe(bottomNavigationRect.top)
	})

	it("Should not have a scroll bar when contents fit fully in view", async () => {
		await goToPage("SimpleGridLayout")
		await page.waitForSelector(mainContentSelector)

		const scrollable = await isScrollable(mainContentSelector)
		expect(scrollable).toBe(false)
	})

	it("Should have a scroll bar when contents don't fit fully in view", async () => {
		await goToPage("SimpleGridScroll") // todo: check if needed
		await page.waitForSelector(mainContentSelector)

		const scrollable = await isScrollable(mainContentSelector)
		expect(scrollable).toBe(true)
	})

	it("On standard css layout, it should not have a scroll bar", async () => {
		await goToPage("StandardSimple", "xs")

		await page.waitForSelector(mainContentSelector)
		const scrollable = await isScrollable(mainContentSelector)
		expect(scrollable).toBe(false)
	})

	it("On standard css layout, it should not have a scroll bar when page is scrollable", async () => {
		// The scroll bar should be on the page itself, not on this element
		await goToPage("StandardScroll", "xs")

		await page.waitForSelector(mainContentSelector)
		const scrollable2 = await isScrollable(mainContentSelector)
		expect(scrollable2).toBe(false)
	})

	it("On standard css layout, should grow higher than viewport when there is a lot of main content", async () => {
		await goToPage("StandardScroll", "xs")
		await page.waitForSelector(mainContentSelector)

		const { rect, windowWidth, windowHeight } = await getClientRectAndWindow(
			mainContentSelector
		)

		const appBarRect = await getClientRect(classNameBeginsWith("MuiAppBar"))

		expect(rect.top).toBe(appBarRect.bottom)
		expect(rect.left).toBe(0)
		expect(rect.bottom).toBeGreaterThan(windowHeight)
		expect(rect.right).toBe(windowWidth)
	})
})
