const express = require('express');
const path = require('path');
const fileSysRouters = require('./routers/fileSysRouters.js');

// For Main Server
const MAIN_PORT = 3000;
const mainApp = express();

// For iFrame Server
const IFRAME_PORT = 5000;
const iframeApp = express();

mainApp.use(express.json());
mainApp.use(express.static(__dirname + '/public'));

mainApp.get('/', (req, res) => {
  res.send(200);
});

mainApp.use('/fs', fileSysRouters);

//mainApp.use('*', (req, res) => res.status(400).send('Page Not Found'));

mainApp.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };

  const errObj = Object.assign({}, defaultErr, err);

  console.log(errObj.log);

  return res.status(errObj.status).json(errObj.message);
});

mainApp.listen(MAIN_PORT, () => {
  console.log(`Main server listening on port ${MAIN_PORT}`);
});

iframeApp.use(express.static(__dirname + '/userInfo'));
iframeApp.use(express.json());

// get path needs decided
iframeApp.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './userInfo/test.html'));
});

iframeApp.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };

  const errObj = Object.assign({}, defaultErr, err);

  console.log(errObj.log);

  return res.status(errObj.status).json(errObj.message);
});

iframeApp.listen(IFRAME_PORT, () => {
  console.log(`iFrame server listening on port ${IFRAME_PORT}`);
});
