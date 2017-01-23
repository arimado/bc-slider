const path = require('path')

module.exports = {
    entry: "./src/app.jsx",
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js",
        publicPath: '/dist/'
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.json'],
      root: path.resolve(__dirname, './src'),
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    devtool: 'source-map'
};
