var webpack = require('webpack');
var path = require("path");
module.exports = {
  entry: {bundle :[
    './src/roomsockets.js',
    './src/onp.js'
  ]},
  output: {
    path: path.join(__dirname, "public/javascripts"),
    filename: "[name].js"
  },
  module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }]
     }
};
