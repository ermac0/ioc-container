webpack = require('webpack');

var plugins = [], minimize = process.argv.indexOf('--minimize') !== -1;

if (minimize) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
    entry: './src/ioc-container.js',
    output: {
        path: './build',
        filename: minimize ? 'ioc-container.min.js' : 'ioc-container.js',
        library: 'ioc-container',
        libraryTarget: 'commonjs2'
    },
    module: {
        loaders: [
          { test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/ },
          { test: /\.json$/, loader: "json-loader" }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(require("./package.json").version)
        })
    ].concat(plugins)
};
