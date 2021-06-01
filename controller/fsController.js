const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../userInfo/webpack.user.config');
const getRoot = require('../puppeteer.js');
const getIFrameRoot = require('../puppeteerforIframe.js')

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
      return next();
    }
  });
};

// runs puppeteer once files have been bundled
fsController.runPuppeteer = (req, res, next) => {
  console.log('in runPuppeteer')
  getRoot('http://localhost:5000').then(async (result) => {
    fs.writeFileSync(
      path.join(__dirname, '../src/data.ts'),
      'export default ' + JSON.stringify(result)
    );
    return next();
  });
};

fsController.runPuppeteerIFrame = (req, res, next) => {
  console.log('in runPuppeteerIFrame')
  getIFrameRoot('http://localhost:3000').then(async (result) => {
    console.log('result of iframe pup', result)
    fs.writeFileSync(
      path.join(__dirname, '../src/data.ts'),
      'export default ' + JSON.stringify(result)
    );
    return next();
  })
  .catch(err => console.log('this is error in pupIframe', err))
}

fsController.stylesheet = (req, res, next) => {
  fs.writeFileSync('./userInfo/style.css', req.body.item);
  return next();
};

fsController.individualComponent = (req, res, next) => {
  // takes file name, username and project name from request body
  const { name, username, project } = req.body;

  const createComponent = () => {
    // removes .js or .jsx
    let nameWithoutExtension = name.replace(/.jsx?/g, '');

    // creates string for react component, using file name, username, and project name
    const reactComponent = `import React from 'react'; import ReactDOM from 'react-dom'; import ${nameWithoutExtension} from '../${username}/${project}/${name}'; ReactDOM.render(<${nameWithoutExtension} />, document.getElementById('root'))`;
    return reactComponent;
  };

  // saves react string in variable file
  const file = createComponent();

  // writes react string to index.js
  fs.writeFileSync(
    path.join(__dirname, '../userInfo/individualComponent/index.js'),
    file
  );

  // config object for webpack
  const configOptions = {
    ...webpackConfig,
    entry: {
      main: path.join(__dirname, `../userInfo/individualComponent/index.js`),
    },
    output: {
      path: path.join(__dirname, `../userInfo/individualComponent/build`),
      filename: 'bundle.js',
    },
  };

  // creates webpack compiler
  const compiler = webpack(configOptions);

  // runs compiler and bundles
  compiler.run((err, stats) => {
    if (err) console.log(`There was an error: ${err}`);
    else {
      return next();
    }
  });
};

module.exports = fsController;
