export const isScrollable = (elem: HTMLElement | null) => {
	return isHorizScrollable(elem) || isVertScrollable(elem)
}

export const isHorizScrollable = (elem: HTMLElement | null) => {
	if (!elem) {
		throw Error("No element found")
	}
	const style = getComputedStyle(elem)
	return elem.scrollWidth > elem.offsetWidth && style.overflowX !== "hidden"
}

export const isVertScrollable = (elem: HTMLElement | null) => {
	if (!elem) {
		throw Error("No element found")
	}
	const style = getComputedStyle(elem)
	return elem.scrollHeight > elem.offsetHeight && style.overflowY !== "hidden"
}
