var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: {
        './public/js/index': './src/js/main.js',
    },
    output: {
        path: __dirname,
        filename: '[name].js',
    },
    devtool: 'eval',
    module: {
        loaders: [
            {
                test: /.js$/,
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
            { from: 'src/index.html', to: 'public/'},
            { from: 'src/assets/**/*', to: 'public/'}
        ]),
     ],
};