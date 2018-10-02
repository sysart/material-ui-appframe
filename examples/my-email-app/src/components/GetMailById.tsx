import * as React from "react"

import { Message } from "mockEmails"
import { MailContext, WithMails } from "./MockMailService"

interface Props {
	id: string
	children: (message: Message) => any
}

const getMessage = (context: MailContext, id: string) => {
	const message = context.messages[id]
	if (!message) {
		return undefined
	}

	setTimeout(() => {
		if (!message.read) {
			context.markAsRead(id)
		}
	})

	return message
}

export const GetMailById = (props: Props) => (
	<WithMails>
		{(context) => {
			const message = getMessage(context, props.id)
			if (message) {
				return props.children(message)
			}
		}}
	</WithMails>
)
