import * as React from "react"

import { Button, Switch, Tooltip, Typography } from "@material-ui/core"
import * as colors from "@material-ui/core/colors"
import { Menu, SegmentedButton, SegmentedGroup } from "components"
import { styled } from "components/utilities"
import { WithThemeOptions } from "./ThemeOptionsProvider"

type SelectionMode = "primary" | "secondary"

interface State {
	selectionMode: SelectionMode
}

export class ColorPicker extends React.Component<{}, State> {
	public state = { selectionMode: "primary" } as State

	private setSelectionModeToPrimary = () => {
		this.setState({ selectionMode: "primary" })
	}

	private setSelectionModeToSecondary = () => {
		this.setState({ selectionMode: "secondary" })
	}

	public render() {
		const { selectionMode } = this.state

		return (
			<Menu
				iconButtonProps={{
					color: "inherit"
				}}
				icon="color_lens"
			>
				<WithThemeOptions>
					{({
						primaryColor,
						secondaryColor,
						setPrimaryColor,
						setSecondaryColor,
						darkMode,
						toggleDarkMode
					}) => {
						const selectedColor =
							selectionMode === "primary" ? primaryColor : secondaryColor

						const setColor =
							selectionMode === "primary" ? setPrimaryColor : setSecondaryColor

						return (
							<ColorPickerContainer>
								<SegmentedGroup>
									<SegmentedButton
										onClick={this.setSelectionModeToPrimary}
										style={
											selectionMode === "primary"
												? { backgroundColor: "#88888888" }
												: undefined
										}
									>
										Primary
									</SegmentedButton>
									<SegmentedButton
										onClick={this.setSelectionModeToSecondary}
										style={
											selectionMode === "secondary"
												? { backgroundColor: "#88888888" }
												: undefined
										}
									>
										Secondary
									</SegmentedButton>
								</SegmentedGroup>
								<Colors>
									{Object.keys(colors)
										.filter((colorName) => colorName !== "common")
										.map((colorName) => (
											<Tooltip title={colorName}>
												<ColorSelectButton
													key={colorName}
													style={{
														background: colors[colorName][500],
														border:
															selectedColor === colorName
																? "4px solid black"
																: undefined
													}}
													onClick={() => setColor(colorName)}
												>
													{null}
												</ColorSelectButton>
											</Tooltip>
										))}
								</Colors>
								<Options>
									<Typography>Dark theme</Typography>
									<Switch checked={darkMode} onChange={toggleDarkMode} />
								</Options>
							</ColorPickerContainer>
						)
					}}
				</WithThemeOptions>
			</Menu>
		)
	}
}

const ColorPickerContainer = styled("div")((theme) => ({
	padding: theme.spacing.unit,
	maxWidth: 264,
	outline: "none",

	display: "flex",
	flexDirection: "column"
}))

const Colors = styled("div")({
	display: "flex",
	flexDirection: "row",
	flexWrap: "wrap",
	padding: 4
})

const ColorSelectButton = styled(Button)({
	width: 40,
	minWidth: 40,
	height: 40,
	margin: 4,
	borderRadius: 8
})

const Options = styled("div")({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between"
})
