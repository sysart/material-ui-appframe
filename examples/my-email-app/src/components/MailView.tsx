import * as React from "react"

import {
	Avatar,
	Divider,
	Icon,
	IconButton,
	Paper,
	Typography
} from "@material-ui/core"
import { StarBorder } from "@material-ui/icons"
import { styled } from "material-ui-appframe/utilities"
import { withRouter } from "react-router"
import { Message } from "../mockEmails"
import { GetMailById } from "./GetMailById"

const MailContainer = styled(Paper)(() => ({
	display: "flex",
	flexDirection: "column",
	height: "100%"
}))

const TitleRow = styled("div")(() => ({
	flexShrink: 0,
	display: "flex",
	alignItems: "center",
	padding: "20px",
	paddingLeft: "30px"
}))

const MailTitle = styled(Typography)(() => ({
	flexGrow: 1,
	fontWeight: 400
}))

const SenderRow = styled("div")(() => ({
	flexShrink: 0,
	display: "flex",
	padding: "20px"
}))

const MessageDetails = styled("div")((theme) => ({
	marginLeft: theme.spacing.unit * 2,
	flexGrow: 1,
	display: "flex",
	flexDirection: "column"
}))

const MessageDivider = styled(Divider)((theme) => ({
	marginLeft: theme.spacing.unit * 3,
	marginRight: theme.spacing.unit * 3
}))

const MessageActions = styled("div")(() => ({
	whiteSpace: "nowrap"
}))

const Flex = styled("div")(() => ({
	display: "flex"
}))

const DetailsExpand = styled("a")((theme) => ({
	marginLeft: theme.spacing.unit / 2
}))

const MessageFrom = styled(Typography)(() => ({
	fontWeight: 500,
	fontSize: "1.05em"
}))

const MessageInfo = styled(Typography)((theme) => ({
	fontWeight: 200,
	color: theme.palette.grey[700]
}))

const MessageBody = styled("div")(() => ({
	flex: 1,
	background: "lightblue"
}))

interface Props {
	message: Message
}

const Separator = styled("div")(() => ({
	flex: 1
}))

export const MailViewTitleBar = () => (
	<>
		<Separator />
		<IconButton color="inherit" aria-label="search">
			<Icon>archive</Icon>
		</IconButton>
		<IconButton color="inherit" aria-label="search">
			<Icon>delete</Icon>
		</IconButton>
		<IconButton color="inherit" aria-label="search">
			<Icon>email</Icon>
		</IconButton>
		<IconButton color="inherit" aria-label="search">
			<Icon>more_vert</Icon>
		</IconButton>
	</>
)

export const MailView = ({ message }: Props) => (
	<MailContainer square>
		<TitleRow>
			<MailTitle variant="h6">{message.title}</MailTitle>
			<IconButton
				onClick={(event) => {
					event.stopPropagation()
				}}
			>
				<StarBorder />
			</IconButton>
		</TitleRow>
		<MessageDivider light />
		<SenderRow>
			<Avatar style={{ backgroundColor: message.color }}>
				{message.from[0]}
			</Avatar>
			<MessageDetails>
				<MessageFrom>{message.from}</MessageFrom>
				<MessageInfo>to me</MessageInfo>
				<Flex>
					<MessageInfo>Yesterday</MessageInfo>
					<DetailsExpand href="#">View details</DetailsExpand>
				</Flex>
			</MessageDetails>
			<MessageActions>
				<IconButton>
					<Icon>reply</Icon>
				</IconButton>
				<IconButton>
					<Icon>forward</Icon>
				</IconButton>
				<IconButton>
					<Icon>more_vert</Icon>
				</IconButton>
			</MessageActions>
		</SenderRow>
		<MessageBody>{message.body}</MessageBody>
	</MailContainer>
)

export const MailViewWithRouter = withRouter((props) => (
	<GetMailById id={props.match.params.mail_id}>
		{(message) => <MailView message={message} />}
	</GetMailById>
))
