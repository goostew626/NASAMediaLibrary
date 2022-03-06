module.exports = {
  entry:{
    react:[
      __dirname + "/../source/scripts/main/EntryPoint.tsx"
    ]
  },
  output:{
    path:__dirname + "/../public/scripts"
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        exclude:/node_modules/,
        use:{
          loader:"babel-loader",
          options:{
            presets:["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
          }
        }
      },
      {
        test:/\.tsx$/,
        exclude:/node_modules/,
        loader:"ts-loader"
      }
    ]
  },
  resolve:{
    extensions:[".tsx", ".js"]
  }
}
