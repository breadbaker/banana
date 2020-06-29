const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  devtool: 'cheap-module-eval-source-map',
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
      }
    ]
  },
  plugins: [htmlPlugin]
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
