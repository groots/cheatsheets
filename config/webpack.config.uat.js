var webpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var failPlugin = require('webpack-fail-plugin');

module.exports = {
    entry: [
        "./src/index.tsx"
    ],
    output: {
        path: "./dist",
        filename: "bundle.js",
        publicPath: '/'
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            { test: /\.tsx?$/, loaders: ["babel", "ts-loader"] },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]")
            }
        ]
    },

    plugins: [
        failPlugin,
        new HtmlWebpackPlugin({
          hash: true,
          filename: "index.html",
          inject: "body",
          template: "./src/index.html"
        }),
        new ExtractTextPlugin('app.css', { allChunks: true }),
        new webpack.DefinePlugin({
          "process.env": {
            "NODE_ENV": JSON.stringify("production")
          },
          //Set the environment based on setting a node environment variable (ex: 'ENV=prd webpack')
          ENV: JSON.stringify(`${process.env.ENV}`)
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            screw_ie8: true,
            warnings: false,
            drop_console: true
          }
        })
    ],

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};
