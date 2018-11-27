import {
	classNameBeginsWith,
	getClientRectAndWindow,
	goToPage
} from "./browserUtils"

describe("BottomNavigation", () => {
	const bottomNavSelector = classNameBeginsWith("MuiBottomNavigation")

	it("Should be positioned at the bottom of the viewport", async () => {
		await goToPage("TooWideThingsGrid", "sm")
		await page.waitForSelector(bottomNavSelector)

		const { rect, windowWidth, windowHeight } = await getClientRectAndWindow(
			bottomNavSelector
		)

		expect(rect.bottom).toBe(windowHeight)
		expect(rect.left).toBe(0)
		expect(rect.right).toBe(windowWidth)
	})

	it("Should be positioned at the bottom of the viewport when scrolling", async () => {
		await goToPage("SimpleGridScroll", "md", "/cards")
		await page.waitForSelector(bottomNavSelector)
		// The page should not actually scroll in this layout
		// Not sure if this test is even useful
		await page.evaluate(`window.scrollBy(0, 300)`)

		const {
			rect,
			windowWidth,
			windowHeight,
			scrollY
		} = await getClientRectAndWindow(bottomNavSelector)

		expect(rect.bottom).toBe(windowHeight)
		expect(rect.left).toBe(0)
		expect(rect.right).toBe(windowWidth)
		expect(scrollY).toBe(0)
	})

	it("On standard css layout, should be positioned at the bottom of the viewport when scrolling", async () => {
		await goToPage("StandardScroll", "xs")
		await page.waitForSelector(bottomNavSelector)
		await page.evaluate(`window.scrollBy(0, 300)`)

		const {
			rect,
			windowWidth,
			windowHeight,
			scrollY
		} = await getClientRectAndWindow(bottomNavSelector)

		expect(rect.bottom).toBe(windowHeight)
		expect(rect.left).toBe(0)
		expect(rect.right).toBe(windowWidth)
		expect(scrollY).toBe(300)
	})
})
