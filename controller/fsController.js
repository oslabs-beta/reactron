const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../userInfo/webpack.user.config');
const getRoot = require('../puppeteer.js');

const fsController = {};

// user will upload files:
fsController.saveFiles = (req, res, next) => {
  // take username, project name and files from request body
  const { username, project, files, style } = req.body;

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
    fs.mkdirSync(path.join(__dirname, `../userInfo/${username}/${project}`));
  }

  // check if style directory for proj exists at userInfo/projname/style
  const styleDirExists = fs.existsSync(
    path.resolve(__dirname, `../userInfo/${username}/${project}/style`)
  );

  if (!styleDirExists) {
    fs.mkdirSync(
      path.join(__dirname, `../userInfo/${username}/${project}/style`)
    );
  }

  try {
    fs.writeFileSync(
      path.join(
        __dirname,
        `../userInfo/${username}/${project}/style/style.css`
      ),
      style.toString()
    );
  } catch (err) {
    console.log(err);
  }

  try {
    fs.writeFileSync(
      path.join(
        __dirname,
        `../userInfo/${username}/${project}/style/style.css`
      ),
      style.toString()
    );
  } catch (err) {
    console.log(err);
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
  res.locals.username = username;
  res.locals.project = project;
};

fsController.individualBundle = (req, res, next) => {
  // config object for webpack
  const configOptions = {
    ...webpackConfig,
    entry: {
      main: path.join(
        __dirname,
        `../userInfo/${res.locals.username}/${res.locals.project}/index.js`
      ),
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

// // runs puppeteer once files have been bundled
// fsController.runPuppeteer = (req, res, next) => {
//   console.log('in runPuppeteer');
//   getRoot('http://localhost:5000').then(async (result) => {
//     fs.writeFileSync(
//       path.join(__dirname, '../src/data.ts'),
//       'export default ' + JSON.stringify(result)
//     );
//     return next();
//   });
// };

fsController.stylesheet = (req, res, next) => {
  fs.writeFileSync('./userInfo/style.css', req.body.item);
  fs.writeFileSync('./userInfo/individualComponent/style.css', req.body.item);
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

fsController.runDemo = (req, res, next) => {
  const stylesheet = fs.readFileSync(
    path.join(__dirname, `../userInfo/demo/index.css`),
    'utf8'
  );

  fs.writeFileSync('./userInfo/style.css', stylesheet);
  fs.writeFileSync('./userInfo/individualComponent/style.css', stylesheet);

  // config object for webpack
  const configOptions = {
    ...webpackConfig,
    entry: {
      main: path.join(__dirname, `../userInfo/demo/components/index.js`),
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

fsController.prevProjects = (req, res, next) => {
  const { username } = req.body;

  const userDirExists = fs.existsSync(
    path.resolve(__dirname, `../userInfo/${username}`)
  );

  if (userDirExists) {
    const result = fs.readdirSync(
      path.resolve(__dirname, `../userInfo/${username}`)
    );
    res.locals.projects = result;
    return next();
  }

  res.locals.projects = [];
  return next();
};

fsController.prevProjectUpload = (req, res, next) => {
  const { projName, username } = req.body;

  console.log('in prev proj upload controller');

  const confirmDirExists = fs.existsSync(
    path.resolve(__dirname, `../userInfo/${username}/${projName}`)
  );

  if (!confirmDirExists) return res.status(400).send('Error');

  const stylesheet = fs.readFileSync(
    path.join(__dirname, `../userInfo/${username}/${projName}/style/style.css`),
    'utf8'
  );

  fs.writeFileSync('./userInfo/style.css', stylesheet);
  fs.writeFileSync('./userInfo/individualComponent/style.css', stylesheet);

  const fileObjs = fs.readdirSync(
    path.join(__dirname, `../userInfo/${username}/${projName}`)
  );

  res.locals.files = [];

  fileObjs.splice(fileObjs.indexOf('style'), 1);

  fileObjs.forEach((file) => {
    res.locals.files.push({ name: file });
  });

  res.locals.username = username;
  res.locals.project = projName;

  // config object for webpack
  const configOptions = {
    ...webpackConfig,
    entry: {
      main: path.join(
        __dirname,
        `../userInfo/${username}/${projName}/index.js`
      ),
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

module.exports = fsController;
