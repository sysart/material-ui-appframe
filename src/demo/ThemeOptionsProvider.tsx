import * as React from "react"

interface Props {
	children: React.ReactNode
}

interface State {
	darkMode: boolean
	rightToLeft: boolean
}

interface ThemeOptions extends State {
	toggleDarkMode: () => void
	toggleRightToLeft: () => void
}

const { Consumer: WithThemeOptions, Provider } = React.createContext<
	ThemeOptions
>(null as any)

export { WithThemeOptions }

export class ThemeOptionsProvider extends React.Component<Props, State> {
	public state = {
		darkMode: false,
		rightToLeft: false
	}

	private toggleDarkMode = () => {
		this.setState((prevState) => ({ darkMode: !prevState.darkMode }))
	}

	private toggleRightToLeft = () => {
		this.setState((prevState) => ({ rightToLeft: !prevState.rightToLeft }))
	}

	public render() {
		return (
			<Provider
				value={{
					toggleDarkMode: this.toggleDarkMode,
					toggleRightToLeft: this.toggleRightToLeft,
					...this.state
				}}
			>
				{this.props.children}
			</Provider>
		)
	}
}
