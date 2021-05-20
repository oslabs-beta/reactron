const webpack = require('webpack');
const config = require('./webpack.user.config.js');

const compiler = webpack(config);

compiler.run((err, stats) => {
  if (err) console.log(`There was an error: ${err}`);
  else console.log(`There was not an error: ${stats}`);
});
