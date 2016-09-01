var webpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    entry: [
        "react-hot-loader/patch",
        "webpack-dev-server/client?http://local.usafootball.com",
        "webpack/hot/only-dev-server",
        "./src/index.tsx"
    ],
    output: {
        path: __dirname + '/../dist',
        filename: "bundle.js"
    },

    // Sourcemaps for debugging webpack's output.
    devtool: "source-map",

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
        ],

        preLoaders: [
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          hash: true,
          filename: "index.html",
          inject: "body",
          template: "./src/index.html"
        }),
        new WebpackNotifierPlugin({ alwaysNotify: true }),
        new ExtractTextPlugin('app.css', { allChunks: true }),
        new webpack.DefinePlugin({
          //Set the environment based on setting a node environment variable (ex: 'ENV=prd webpack')
          ENV: JSON.stringify(`${process.env.ENV}`)
        })
    ],

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};
