const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');
// create a list of twig files to generate
// filter out anything that starts with an underscore or is not a twig file
function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = `${dir}/${file}`;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory() && path.basename(file).indexOf('_') !== 0) {
            /* Recurse into a subdirectory */
            results = results.concat(walk(file));
        } else if (
            stat &&
            !stat.isDirectory() &&
            path.extname(file) === '.twig' &&
            path.basename(file).indexOf('_') !== 0
        ) {
            /* Is a file */
            results.push(file);
        }
    });
    return results;
}
const files = walk('./src/twig');

// generates html plugins to export
const htmlPlugins = files.map(
    file =>
        // Create new HTMLWebpackPlugin with options
        new HtmlWebpackPlugin({
            filename: file.replace('./src/twig/', '').replace('.twig', '.html'),
            template: path.resolve(__dirname, file),
            hash: true,
        })
);

module.exports = [
    new WebpackNotifierPlugin({ alwaysNotify: true }),

    // inject into files
    new webpack.ProvidePlugin({
        jQuery: 'jquery',
        jquery: 'jquery',
        $: 'jquery',
        'window.jQuery': 'jQuery',
    }),

    new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
        chunkFilename: '[id].css',
    }),

    // new CopyWebpackPlugin([{ from: './assets', to: './assets' }]),
    new CleanWebpackPlugin({
        protectWebpackAssets: true,
        cleanOnceBeforeBuildPatterns: [],
        cleanAfterEveryBuildPatterns: [
            '*.js',
            '*.css',
            '*.map',
            '.html',
            '!uploads/**',
            '!assets/**',
        ],
    }),

    new WebpackManifestPlugin({
        filter: ({ name }) => name.endsWith('.js') || name.endsWith('.css'),
    }),
].concat(htmlPlugins);
