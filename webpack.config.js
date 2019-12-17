const path = require('path');
const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins');

module.exports = {
    stats: {
        entrypoints: false,
        children: false,
    },
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './js/main.js',
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, './web'),
        filename: '[name].[hash].js',
    },
    module: {
        rules: rules
    },
    plugins: plugins,
    watch: false,
};