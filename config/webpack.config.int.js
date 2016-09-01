var webpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        "./src/index.tsx"
    ],
    output: {
        path: "./dist",
        filename: "bundle.js"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            { test: /\.tsx?$/, loaders: ["babel", "ts-loader"] },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5")
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
          hash: true,
          filename: "index.html",
          inject: "body",
          template: "./src/index.html"
        }),
        new ExtractTextPlugin("app.css", { allChunks: true }),
        new webpack.DefinePlugin({
          "process.env": {
            "NODE_ENV": JSON.stringify("production")
          },
          //Set the environment based on setting a node environment variable (ex: 'ENV=prd webpack')
          ENV: JSON.stringify(`${process.env.ENV}`)
        })
    ],

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};
