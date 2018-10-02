import * as React from "react"

import { Icon, IconButton, List } from "@material-ui/core"
import { Create as CreateIcon } from "@material-ui/icons"
import {
	FloatingActionButton,
	NavigationToggle,
	Title
} from "material-ui-appframe"
import { styled } from "material-ui-appframe/utilities"
import { Message } from "mockEmails"
import { Route, withRouter } from "react-router"
import { MailListItem } from "./MailListItem"
import { WithMails } from "./MockMailService"

export const MailListTitleBar = () => (
	<>
		<NavigationToggle />
		<Route
			path="/mail/:mailbox_id/"
			render={(props) => (
				<Title>{formatMailboxTitle(props.match.params.mailbox_id)}</Title>
			)}
		/>
		<Route
			path="/label/:label/"
			render={(props) => (
				<Title>{formatMailboxTitle(props.match.params.label)}</Title>
			)}
		/>
		<Separator />
		<IconButton color="inherit" aria-label="search">
			<Icon>search</Icon>
		</IconButton>
	</>
)

/**
 * For illustration purposes, we come up with a title just by
 * uppercasing the first letter of the mailbox url
 */

const formatMailboxTitle = (s: string) => {
	return s.charAt(0).toUpperCase() + s.slice(1)
}

const Separator = styled("div")(() => ({
	flex: 1
}))

export const MailList = withRouter((props) => (
	<>
		<List>
			<WithMails>
				{({ messages }) =>
					Object.values(messages).map((message: Message) => (
						<MailListItem
							selected={
								props.match && props.match.params.mail_id === message.id
							}
							message={message}
							key={message.id}
						/>
					))
				}
			</WithMails>
		</List>
		<FloatingActionButton color="primary" aria-label="Add">
			<CreateIcon />
		</FloatingActionButton>
	</>
))
