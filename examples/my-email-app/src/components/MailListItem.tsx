import * as React from "react"

import {
	Avatar as MuiAvatar,
	Icon,
	IconButton,
	ListItem,
	Typography
} from "@material-ui/core"
import { StarBorder } from "@material-ui/icons"
import { styled } from "material-ui-appframe/utilities"
import { Message } from "mockEmails"
import { Link } from "react-router-dom"

const StyledListItem = styled(ListItem)((theme) => ({
	display: "flex",
	paddingTop: theme.spacing.unit / 2,
	paddingBottom: theme.spacing.unit / 2,
	paddingLeft: theme.spacing.unit,
	paddingRight: theme.spacing.unit
}))

const Avatar = styled(MuiAvatar)(() => ({}))

const TextArea = styled("div")((theme) => ({
	flex: 1,
	flexShrink: 1,
	marginLeft: theme.spacing.unit,
	display: "flex",
	flexDirection: "column",
	minWidth: 0
}))

const SenderRow = styled("div")(() => ({
	display: "flex",
	flexDirection: "row"
}))

const SenderAndMailCount = styled("div")(() => ({
	display: "flex",
	flexDirection: "row",
	flex: 1,
	minWidth: 0
}))

const DateAndInfo = styled("div")(() => ({
	display: "flex",
	flexDirection: "row"
}))

const TitleAndContentsRow = styled("div")(() => ({
	display: "flex",
	flexDirection: "row"
}))

const TitleAndContents = styled("div")(() => ({
	flex: 1,
	display: "flex",
	flexDirection: "column",
	minWidth: 0
}))

const MailFrom = styled(Typography)(() => ({
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
	fontWeight: 500,
	fontSize: "1.05em"
}))

const MailFromRead = styled(Typography)(() => ({
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
	fontWeight: 300,
	fontSize: "1.05em"
}))

const MailThreadCount = styled(Typography)((theme) => ({
	paddingLeft: 6,
	fontSize: "1.05em",
	fontWeight: 500,
	color: theme.palette.grey[600]
}))

const MailThreadCountRead = styled(Typography)((theme) => ({
	paddingLeft: 6,
	fontSize: "1.05em",
	fontWeight: 300,
	color: theme.palette.grey[600]
}))

const MailInfoIcon = styled(Icon)((theme) => ({
	color: theme.palette.grey[600],
	marginLeft: 4,
	marginRight: 4
}))

const MailDateTime = styled(Typography)((theme) => ({
	fontWeight: 500,
	color: theme.palette.secondary.main
}))

const MailDateTimeRead = styled(Typography)((theme) => ({
	fontWeight: 300
}))

const MailTitle = styled(Typography)(() => ({
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
	fontWeight: 500
}))

const MailTitleRead = styled(Typography)(() => ({
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
	fontWeight: 300
}))

const MailContentPreview = styled(Typography)(() => ({
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis"
}))

const MailContentPreviewRead = styled(Typography)(() => ({
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
	fontWeight: 100
}))

const MailLink = styled(Link)(() => ({
	color: "initial",
	textDecoration: "none"
}))

interface Props {
	message: Message
	selected?: boolean
}

export class MailListItem extends React.Component<Props> {
	public shouldComponentUpdate(nextProps: Props) {
		return (
			this.props.message.read !== nextProps.message.read ||
			this.props.selected !== nextProps.selected
		)
	}

	public renderUnread() {
		const { message } = this.props
		return (
			<TextArea>
				<SenderRow>
					<SenderAndMailCount>
						<MailFrom>{message.from}</MailFrom>
						<MailThreadCount>{message.threadcount}</MailThreadCount>
					</SenderAndMailCount>
					<DateAndInfo>
						{message.numAttachments > 0 && (
							<MailInfoIcon>attachment</MailInfoIcon>
						)}
						<MailDateTime>{formatDate(message.date)}</MailDateTime>
					</DateAndInfo>
				</SenderRow>
				<TitleAndContentsRow>
					<TitleAndContents>
						<MailTitle>{message.title}</MailTitle>
						<MailContentPreview>
							{message.body.slice(0, 200)}
						</MailContentPreview>
					</TitleAndContents>
					<div>
						<IconButton
							onClick={(event) => {
								event.stopPropagation()
								// return false
							}}
						>
							<StarBorder />
						</IconButton>
					</div>
				</TitleAndContentsRow>
			</TextArea>
		)
	}

	public renderRead() {
		const { message } = this.props
		return (
			<TextArea>
				<SenderRow>
					<SenderAndMailCount>
						<MailFromRead>{message.from}</MailFromRead>
						<MailThreadCountRead>{message.threadcount}</MailThreadCountRead>
					</SenderAndMailCount>
					<DateAndInfo>
						{message.numAttachments > 0 && (
							<MailInfoIcon>attachment</MailInfoIcon>
						)}
						<MailDateTimeRead>{formatDate(message.date)}</MailDateTimeRead>
					</DateAndInfo>
				</SenderRow>
				<TitleAndContentsRow>
					<TitleAndContents>
						<MailTitleRead>{message.title}</MailTitleRead>
						<MailContentPreviewRead>
							{message.body.slice(0, 200)}
						</MailContentPreviewRead>
					</TitleAndContents>
					<div>
						<IconButton
							onClick={(event) => {
								event.stopPropagation()
								// return false
							}}
						>
							<StarBorder />
						</IconButton>
					</div>
				</TitleAndContentsRow>
			</TextArea>
		)
	}

	public render() {
		const { message, selected } = this.props
		return (
			<MailLink to={`/mail/primary/${message.id}`}>
				<StyledListItem divider button selected={selected}>
					<Avatar style={{ backgroundColor: message.color }}>
						{message.from[0]}
					</Avatar>
					{message.read ? this.renderRead() : this.renderUnread()}
				</StyledListItem>
			</MailLink>
		)
	}
}

const formatDate = (date: Date) =>
	`${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}`

const formatNumber = (n: number): string => {
	if (n < 10) {
		return "0" + n
	}
	return "" + n
}
