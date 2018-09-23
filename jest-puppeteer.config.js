module.exports = {
  server: {
	command: 'cross-env BROWSER=none PORT=3001 react-scripts-ts start',
	port: 3001,
	debug: false
  },
  launch: {
    dumpio: false,
    headless: process.env.HEADLESS !== 'false',
  },
}