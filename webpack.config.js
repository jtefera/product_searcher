var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = [{
    entry: {
        './public/js/index': './src/js/main.js',
    },
    output: {
        path: __dirname,
        filename: '[name].js',
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-2'],
                },
            }
        ],
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/index.html', to: 'public/' },
            { from: 'src/assets/**/*', to: 'public/' },
            { from: 'src/css/**/*', to: 'public/style/', flatten: true }
        ]),
    ],
}];