import * as React from "react"

interface LegacyCSSLayoutProps {
	disabled?: boolean
}
interface LegacyCSSLayoutState {
	appBarHeight: number
	bottomNavigationHeight: number
}

export interface LegacyCSSLayoutContext extends LegacyCSSLayoutState {
	legacyMobileCssEnabled: boolean
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
	LegacyCSSLayoutProps,
	LegacyCSSLayoutState
> {
	public state = {
		appBarHeight: 0,
		bottomNavigationHeight: 0
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
					legacyMobileCssEnabled: !this.props.disabled
				}}
			>
				{this.props.children}
			</Provider>
		)
	}
}
