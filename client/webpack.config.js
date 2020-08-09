const HtmlWebPackPlugin = require("html-webpack-plugin");

const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
const path = require('path')
const options = {
  antDir: path.join(__dirname, './node_modules/antd'),
  stylesDir: path.join(__dirname, './src'),
  varFile: path.join(__dirname, './src/styles/variables.less'),
  themeVariables: ['@primary-color'],
  indexFileName: 'index.html',
  generateOnce: false,
  lessUrl: "https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js",
  publicPath: "",
  customColorRegexArray: [], // An array of regex codes to match your custom color variable values so that code can identify that it's a valid color. Make sure your regex does not adds false positives.
}
 
const themePlugin = new AntDesignThemePlugin(options);
// in config object

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  // devServer: {
  //   before: function(app, server, compiler) {
  //     app.get('/app/*', function(req, res) {
  //       res.sendFile(__dirname + './src/index.html')
  //     });
  //     app.get('/login', function(req, res) {
  //       res.sendFile(__dirname + './src/index.html')
  //     });
  //   }
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(ico|png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ]
  },
  plugins: [htmlPlugin, themePlugin],
  resolve: {
    extensions: ['.js', '.jsx', '.less']
  }
};




// module.exports = {
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader"
//         }
//       }
//     ]
//   }
// };





// {
//   "presets": ["@babel/preset-env", "@babel/preset-react"],
//   "env": {
//     "development": {
//       "plugins": [
//         "babel-relay-plugin-loader",
//         [
//           "react-transform",
//           {
//             "transforms": [
//               {
//                 "transform": "react-transform-hmr",
//                 "imports": [
//                   "react"
//                 ],
//                 "locals": [
//                   "module"
//                 ]
//               },
//               {
//                 "transform": "react-transform-catch-errors",
//                 "imports": [
//                   "react",
//                   "redbox-react"
//                 ]
//               }
//             ]
//           }
//         ]
//       ]
//     }
//   },
//   "plugins": [
//     ["react-transform", {
//       // must be an array of objects
//       "transforms": [{
//         // can be an NPM module name or a local path
//         "transform": "react-transform-hmr",
//         // see transform docs for "imports" and "locals" dependencies
//         "imports": ["react"],
//         "locals": ["module"]
//       }, {
//         // you can have many transforms, not just one
//         "transform": "react-transform-catch-errors",
//         "imports": ["react", "redbox-react"]
//       }, {
//         // can be an NPM module name or a local path
//         "transform": "."
//       }]
//     }],
//     ["module-resolver", {
//       "root": ["."],
//       "alias": {
//         "containers": "./containers",
//       }
//     }]
//   ]
// }
