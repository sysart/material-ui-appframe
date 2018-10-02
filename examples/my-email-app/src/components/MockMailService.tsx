import * as React from "react"
import { Message, messageMap } from "../mockEmails"

interface State {
	messages: Record<string, Message>
}

export interface MailContext extends State {
	markAsRead: (id: string) => void
}

const { Consumer, Provider } = React.createContext<MailContext>(null as any)

export { Consumer as WithMails }

export class MockMailService extends React.Component<{}, State> {
	public state = { messages: messageMap }

	private markAsRead = (id: string) => {
		this.setState((previousState) => {
			/**
			 * This is the problem that state management libraries such as Redux
			 * are attempting to solve. All of this should be considered a mock implementation
			 * that exists only for the purpose of showcasing the UI.
			 *
			 * In real life, none of this state should be stored (only) on the client anyway.
			 */

			const previousMessages = previousState.messages
			const msg = previousMessages[id]
			if (!msg) {
				return {}
			}
			if (msg.read) {
				return {}
			}
			const newMessage = { ...msg, read: true }
			const newMessages = {
				...previousMessages,
				[newMessage.id]: newMessage
			}
			return { messages: newMessages } as State
		})
	}

	public render() {
		return (
			<Provider
				value={{ messages: this.state.messages, markAsRead: this.markAsRead }}
			>
				{this.props.children}
			</Provider>
		)
	}
}
