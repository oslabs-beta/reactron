const fs = require('fs');
const path = require('path');
const fsController = {};

// for each component file
// get file
// read contents
// const contents = await file.text();
// displayStr = displayStr + '\n' + (await contents);
// add to a "display" file
// compile display file into bundle
// serve index2.html with bundled file

fsController.uploadFiles = async (req, res, next) => {
  const components = JSON.parse(req.body.item);
  let str = '';
  components.forEach((elem) => {
    str = str + elem.toString() + '\n';
  });
  // const newStr = babel.transformSync(
  //   str,
  //   {
  //     babelrc: true,
  //     filename: '.babelrc',
  //   },
  //   function (err, res) {
  //     console.log(res);
  //   }
  // );
  fs.appendFileSync(path.join(__dirname, '../userInfo/bundle.js'), str);
  next();
};

module.exports = fsController;
