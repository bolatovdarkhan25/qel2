var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "source-map",
  entry: ["./client/src/index.js"],
  output: {
    path: path.join(__dirname, "/client/public/build"),
    publicPath: "/client/public/static/",
    filename: "bundle.js"
    // chunkFilename: "[name].chunk.js"
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: "all",
  //     minChunks: 2
  //   }
  //   // ...some other rules
  // },
  watch: true,
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: "client/public/index.html",
  //     inject: true,
  //     chunks: ["app"]
  //   })
  // ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react", "stage-0"]
        }
      },
      {
        test: /\.css/,
        loaders: ["style-loader", "css-loader"]
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
        loader: "file-loader?name=[name].[ext]"
      }
    ]
  }
};
