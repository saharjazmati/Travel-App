const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const sass = require("node-sass");
const WorkboxPlugin = require("workbox-webpack-plugin");
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
  entry: "./src/client/index.js",
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: 3000,
  },
  output: {
    libraryTarget: "var",
    library: "Client",
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            enforce: 'pre',
            use: ['source-map-loader'],
          },
      {
        test: "/.js$/",
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    new WorkboxPlugin.GenerateSW(),
    new SourceMapDevToolPlugin({
        filename: "[file].map"
      }),
  ],
};
