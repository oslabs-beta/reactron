const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../userInfo/webpack.user.config');
const getRoot = require('../puppeteer.js');

const fsController = {};

// user will upload files:
fsController.saveFiles = (req, res, next) => {
  // take username, project name and files from request body
  const { username, project, files } = req.body;

  // check if directory for username exists at userInfo/username
  const userDirExists = fs.existsSync(
    path.resolve(__dirname, `../userInfo/${username}`)
  );

  // if not exist, create
  if (!userDirExists) {
    fs.mkdirSync(path.join(__dirname, `../userInfo/${username}`));
  }

  // check if directory for proj exists at userInfo/projname
  const projDirExists = fs.existsSync(
    path.resolve(__dirname, `../userInfo/${username}/${project}`)
  );

  //  if not, create
  if (!projDirExists) {
    fs.mkdir(
      path.join(__dirname, `../userInfo/${username}/${project}`),
      (err) => {
        if (err) console.log(err);
      }
    );
  }

  console.log(files);

  // for each file in array, creates file in username/project directory
  files.forEach((file) => {
    fs.writeFileSync(
      path.join(__dirname, `../userInfo/${username}/${project}/${file.name}`),
      file.contents
    );
  });

  // config object for webpack
  const configOptions = {
    ...webpackConfig,
    entry: {
      main: path.join(__dirname, `../userInfo/${username}/${project}/index.js`),
    },
    output: {
      path: path.join(__dirname, `../userInfo/build`),
      filename: 'bundle.js',
    },
  };

  // creates webpack compiler
  const compiler = webpack(configOptions);

  // runs compiler and bundles
  compiler.run((err, stats) => {
    if (err) console.log(`There was an error: ${err}`);
    else {
      console.log('success');
      return next();
    }
  });
};

// runs puppeteer once files have been bundled
fsController.runPuppeteer = (req, res, next) => {
  getRoot('http://localhost:5000').then(async (result) => {
    //console.log(result);
    fs.writeFileSync(
      path.join(__dirname, '../src/data.ts'),
      'export default ' + JSON.stringify(result)
    );
    return next();
  });
};

fsController.stylesheet = (req, res, next) => {
  fs.writeFileSync('./userInfo/style.css', req.body.item);
  next();
};

fsController.individualComponent = (req, res, next) => {
  console.log(req.body.name);
  const username = 'sample';
  const project = 'sampleApp';

  const createComponent = (name) => {
    let newName = name.replace(/.jsx?/g, '');
    const reactComponent = `import React from 'react'; import ReactDOM from 'react-dom'; import ${newName} from '../userInfo/${username}/${project}/${name}'; ReactDOM.render(<${newName} />, document.getElementById('root'))`;
    return reactComponent;
  };
  const file = createComponent(req.body.name);

  fs.writeFileSync(path.join(__dirname, '../indComp/index.js'), file);

  // config object for webpack
  const configOptions = {
    ...webpackConfig,
    entry: {
      main: path.join(__dirname, `../indComp/index.js`),
    },
    output: {
      path: path.join(__dirname, `../indComp/build`),
      filename: 'bundle.js',
    },
  };

  // creates webpack compiler
  const compiler = webpack(configOptions);

  // runs compiler and bundles
  compiler.run((err, stats) => {
    if (err) console.log(`There was an error: ${err}`);
    else {
      console.log('success');
      return next();
    }
  });
};

module.exports = fsController;
