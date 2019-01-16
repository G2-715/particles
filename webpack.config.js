const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "build.js"
  },
  module: {
    rules: [
        {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env', 
              {
                plugins: [
                  '@babel/plugin-proposal-class-properties'
                ]
              }
            ],
          }
        } 
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: "./src/index.html",
      to: "index.html"
    }])
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000
  }
}