import { Divider, Hidden, List, ListSubheader } from "@material-ui/core"
import { AllInbox } from "@material-ui/icons"
import { GetMailById } from "components/GetMailById"
import { MailList, MailListTitleBar } from "components/MailList"
import { MailView, MailViewTitleBar } from "components/MailView"
import {
	AppFrame,
	MainContent as AppFrameMainContent,
	MobileActivity,
	Navigation,
	NavigationLink,
	SubMenu,
	SubMenuTitleBar,
	TitleBar,
	UpNavigationButton
} from "material-ui-appframe"
import { styled } from "material-ui-appframe/utilities"
import * as React from "react"
import { Redirect, Route } from "react-router"

export const App = () => (
	<AppFrame withLegacyMobileLayout>
		<Hidden mdUp>
			<LayoutXs />
		</Hidden>
		<Hidden smDown>
			<LayoutWide />
		</Hidden>
		<Nav />
	</AppFrame>
)

const LayoutXs = () => (
	<>
		<Route exact path="/" render={() => <Redirect to="/mail/primary/" />} />
		<TitleBar>
			<MailListTitleBar />
		</TitleBar>

		<Route path="/:type/:mailbox_id/">
			<MainContent>
				<MailList />
			</MainContent>
		</Route>
		<Route
			path="/:type/:mailbox_id/:mail_id/"
			render={(props) => (
				<MobileActivity>
					<TitleBar>
						<UpNavigationButton />
						<MailViewTitleBar />
					</TitleBar>
					<MainContent>
						<GetMailById id={props.match.params.mail_id}>
							{(message) => <MailView message={message} />}
						</GetMailById>
					</MainContent>
				</MobileActivity>
			)}
		/>
	</>
)

const LayoutWide = () => (
	<>
		<Route exact path="/" render={() => <Redirect to="/mail/primary/0" />} />
		<Route
			exact
			path="/:type"
			render={() => <Redirect to="/mail/primary/0" />}
		/>
		<Route
			exact
			path="/:type/:mailbox_id"
			render={({ match }) => (
				<Redirect to={`/${match.params.type}/${match.params.mailbox_id}/0`} />
			)}
		/>
		<Route
			path="/:type/:mailbox_id/:mail_id/"
			render={(props) => (
				<>
					<SubMenuTitleBar>
						<MailListTitleBar />
					</SubMenuTitleBar>
					<SubMenu style={{ width: 360 }}>
						<MailList />
					</SubMenu>
					<TitleBar>
						<MailViewTitleBar />
					</TitleBar>
					<MainContent>
						<GetMailById id={props.match.params.mail_id}>
							{(message) => <MailView message={message} />}
						</GetMailById>
					</MainContent>
				</>
			)}
		/>
	</>
)

const Nav = () => (
	<Navigation variant="temporary">
		<List>
			<NavigationLink exact to="/mail/all" icon={<AllInbox />}>
				All inboxes
			</NavigationLink>
		</List>
		<Divider />
		<List>
			<NavigationLink exact to="/mail/primary" icon="inbox">
				Primary
			</NavigationLink>
			<NavigationLink exact to="/mail/social" icon="group">
				Social
			</NavigationLink>
			<NavigationLink exact to="/mail/promotions" icon="local_offer">
				Promotions
			</NavigationLink>
		</List>
		<List>
			<ListSubheader>All labels</ListSubheader>
			<NavigationLink exact to="/label/starred" icon="star">
				Starred
			</NavigationLink>
			<NavigationLink exact to="/label/snoozed" icon="watch_later">
				Snoozed
			</NavigationLink>
			<NavigationLink exact to="/label/important" icon="label_important">
				Important
			</NavigationLink>
			<NavigationLink exact to="/label/sent" icon="send">
				Sent
			</NavigationLink>
			<NavigationLink exact to="/label/outbox" icon="how_to_vote">
				Outbox
			</NavigationLink>
			<NavigationLink exact to="/label/drafts" icon="insert_drive_file">
				Drafts
			</NavigationLink>
			<NavigationLink exact to="/label/all" icon="mail_outline">
				All mail
			</NavigationLink>
			<NavigationLink exact to="/label/spam" icon="report">
				Spam
			</NavigationLink>
			<NavigationLink exact to="/label/trash" icon="delete">
				Trash
			</NavigationLink>
		</List>
		<Divider />
		<List>
			<NavigationLink to="/settings" icon="settings">
				Settings
			</NavigationLink>
			<NavigationLink to="/help" icon="help">
				Help & feedback
			</NavigationLink>
		</List>
	</Navigation>
)

const MainContent = styled(AppFrameMainContent)(() => ({
	padding: 0
}))
