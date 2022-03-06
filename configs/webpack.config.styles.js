const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry:{
    styles:[
      __dirname + "/../source/styles/main/Main.scss"
    ]
  },
  output:{
    path:__dirname + "/../public/styles"
  },
  plugins:[new MiniCssExtractPlugin()],
  module:{
    rules:[
      {
        test:/\.scss$/,
        use:[MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  }
}
