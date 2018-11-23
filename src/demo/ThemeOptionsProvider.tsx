import * as React from "react"

interface Props {
	children: React.ReactNode
}

interface State {
	darkMode: boolean
	rightToLeft: boolean
	primaryColor: string
	secondaryColor: string
}

interface ThemeOptions extends State {
	toggleDarkMode: () => void
	toggleRightToLeft: () => void
	setPrimaryColor: (color: string) => void
	setSecondaryColor: (color: string) => void
}

const { Consumer: WithThemeOptions, Provider } = React.createContext<
	ThemeOptions
>(null as any)

export { WithThemeOptions }

export class ThemeOptionsProvider extends React.Component<Props, State> {
	public state = {
		darkMode: false,
		rightToLeft: false,
		primaryColor: "indigo",
		secondaryColor: "cyan"
	}

	private toggleDarkMode = () => {
		this.setState((prevState) => ({ darkMode: !prevState.darkMode }))
	}

	private toggleRightToLeft = () => {
		this.setState((prevState) => ({ rightToLeft: !prevState.rightToLeft }))
	}

	private setPrimaryColor = (color: string) => {
		this.setState({ primaryColor: color })
	}

	private setSecondaryColor = (color: string) => {
		this.setState({ secondaryColor: color })
	}

	public render() {
		return (
			<Provider
				value={{
					toggleDarkMode: this.toggleDarkMode,
					toggleRightToLeft: this.toggleRightToLeft,
					setPrimaryColor: this.setPrimaryColor,
					setSecondaryColor: this.setSecondaryColor,
					...this.state
				}}
			>
				{this.props.children}
			</Provider>
		)
	}
}
