const path = require('path');
const BUILD_DIR = path.resolve(__dirname, 'build');
const APP_DIR = path.resolve(__dirname);

//Reactron App webpack builder
module.exports = {
  mode: 'development',
  entry: {
    main: APP_DIR + '/index.js',
  },
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR,
  },
  target: 'node',
  resolve: {
    fallback: {
      fs: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
