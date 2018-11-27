# Material UI AppFrame: Responsive layout components for Material UI Applications

[Material UI](https://material-ui.com/) is an implementation of Google's [Material Design](https://material.io/) for projects using the [React](https://reactjs.org/) web development library. This library provides additional high level components for building the core layout of your application. Material UI AppFrame allows you to spend less time reinventing the wheel and more time focusing on what really matters.

```
npm install material-ui-appframe @material-ui/core @material-ui/icons
```

To get started, see the sample projects in the `examples` directory

At this time, the main features are:

- High level components such as Navigation, TitleBar and MainContent that let you cleanly describe the core layout and structure of your application (see examples below)
- Responsive layout (optionally based on CSS3 grid)
- Navigation drawer with support for collapse menus and a custom CSS based swipeable drawer for mobile devices
- Bottom navigation bar for mobile devices
- Routing with React router
- Support for customization with Material UI theme options. (Everything aims to be customizable according to Material UI conventions. We also set the mobile browser's address bar color to match your Material UI Theme color.)
- Custom implementation of Styled components that lets you style components with TypeScript and access Material UI's theme
- Right-to-left (RTL) support
- Extra convenience components for common screnarios such as TitleBar, Title, TitleBarSearch with more to come
- Experimental: Nested navigation ("activities") using full screen dialogs on mobile devices
- Supports TypeScript out of the box - fully implemented in TypeScript

Todo:

- Testing, testing, testing
- Test and improve customization options

## See it in action

The layout components provided by Material UI AppFrame make it straightforward to describe the layout, navigation and routing of your application while keeping the code readable. The basic structure is as follows:

```typescript
const App = () => (
    <AppFrame>
        <TitleBar>
            {/* Place the contents of your title bar (App Bar) here. */}
        </TitleBar>

        <Navigation>
            {/* Place your navigation components here. */}
        </Navigation>

        <MainContent>
            {/* Place the main content of your app here. If your app has multiple views and you're
                    using a static title bar, this is a good place to add routes to different views. */}
        </MainContent>

        <BottomNavigation mobileOnly>
            {/* Bottom navigation for mobile devices. */}
        </BottomNavigation>
    </AppFrame>
)
```

For a more complete example please see the demo. More examples will be coming soon.

## Customization

What if you want to change the page to dark, that title bar to orange and the font of the title to something else? You're in luck because you've got plenty of options.

### Theme

Material UI has a powerful concept of Themes, which is also fully embraced by AppFrame components. 

Many of the desired visual changes to your application may be accomplished just by changing the theme.

To use a custom theme, simply wrap the AppFrame component in a ThemeProvider.

A good practice is to split your JSX tree early on into Providers and the actual App.

index.tsx:
```typescript
ReactDOM.render(
	<Providers>
		<App />
	</Providers>,
	document.getElementById("root")
)
```

Providers.tsx:
```typescript
/**
 *  Place providers, such as those provided by state management libraries here.
 */

interface Props {
	children: React.ReactNode
}

export const Providers = (props: Props) => (
	<MuiThemeProvider
		theme={createMuiTheme({
            /**
             * Theme options go here.
             */
			palette: { type: "dark" }
		})}
	>
		{props.children}
	</MuiThemeProvider>
)
```

With these changes, we can see that the apprearance of the page has already changed.

For a more fine-grained customization, the AppFrame components implement customization in a similar way to Material UI components.

### Styled components

For your convenience, Material UI AppFrame implements the popular Styled components pattern in a way that allows you to 
take advantage of TypeScript's strong typing and Material UI's theme. See example in demo.

### Injected classNames and classname overriding

If you need even more control, you can override classNames used by AppFrame components.
