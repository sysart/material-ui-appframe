const Webpack = require('react-scripts-ts/config/webpack.config.dev');
const path = require('path');

Webpack.output.path = path.join(__dirname, '../../../target/classes/');

module.exports = Webpack;
