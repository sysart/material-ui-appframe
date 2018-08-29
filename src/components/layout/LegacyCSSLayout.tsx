import * as React from "react"

interface LegacyCSSLayoutState {
	legacyMobileCssEnabled: boolean
	appBarHeight: number
	bottomNavigationHeight: number
}

export interface LegacyCSSLayoutContext extends LegacyCSSLayoutState {
	setAppBarHeight: (height: number) => void
	setBottomNavigationHeight: (height: number) => void
}

const { Consumer, Provider } = React.createContext<LegacyCSSLayoutContext>({
	legacyMobileCssEnabled: false,
	appBarHeight: 0,
	bottomNavigationHeight: 0,
	// tslint:disable-next-line:no-empty
	setAppBarHeight: () => {},
	// tslint:disable-next-line:no-empty
	setBottomNavigationHeight: () => {}
})

export { Consumer as WithLegacyCSSLayout }

export class LegacyCSSLayoutProvider extends React.Component<
	{},
	LegacyCSSLayoutState
> {
	public state = {
		appBarHeight: 0,
		bottomNavigationHeight: 0,
		legacyMobileCssEnabled: true
	}

	private setAppBarHeight = (appBarHeight: number) => {
		this.setState({ appBarHeight })
	}

	private setBottomNavigationHeight = (bottomNavigationHeight: number) => {
		this.setState({ bottomNavigationHeight })
	}

	public render() {
		const { setAppBarHeight, setBottomNavigationHeight } = this
		return (
			<Provider
				value={{
					...this.state,
					setAppBarHeight,
					setBottomNavigationHeight,
					legacyMobileCssEnabled: true
				}}
			>
				{this.props.children}
			</Provider>
		)
	}
}
