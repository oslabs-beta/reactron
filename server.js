const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');

const fileSysRouters = require('./routers/fileSysRouters.js');
const authRouter = require('./routers/authRouter.js');

// For Main Server
const MAIN_PORT = 3000;
const mainApp = express();

// For iFrame Full-App Server
const IFRAME_PORT = 5000;
const iframeApp = express();

// For iFrame Ind-Comp Server
const IND_COMP_PORT = 8000;
const indCompApp = express();

// const getRoot = require('./puppeteer.js');

// getRoot('http://localhost:5000');

// MAIN APP
mainApp.use(passport.initialize());
mainApp.use(express.json({ limit: '50mb', extended: true }));
mainApp.use(express.static(__dirname + '/public'));

mainApp.get('/', (req, res) => {
  res.send(200);
});

mainApp.get('/secret', (req, res) => {
  res.sendFile(path.join(__dirname, './secret.html'));
});

mainApp.get('/secret/build', (req, res) => {
  res.sendFile(path.join(__dirname, './userInfo/build/bundle.js'))
})

mainApp.use('/fs', fileSysRouters);
mainApp.use('/auth', authRouter);

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

// IFRAME FOR FULL APP RENDER

iframeApp.use(express.static(__dirname + '/userInfo'));
iframeApp.use(express.json());

iframeApp.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './userInfo/test.html'));
});

iframeApp.get('/api', (req, res) => {
  res.send(200);
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
  console.log(`Full App server listening on port ${IFRAME_PORT}`);
});

// IFRAME FOR INDIVIDUAL COMPONENT RENDER

indCompApp.use(express.static(__dirname + '/userInfo/individualComponent'));
indCompApp.use(express.json());

indCompApp.get('/', (req, res) => {
  res.sendFile(
    path.join(__dirname, './userInfo/individualComponent/index.html')
  );
});

indCompApp.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };

  const errObj = Object.assign({}, defaultErr, err);

  console.log(errObj.log);

  return res.status(errObj.status).json(errObj.message);
});

indCompApp.listen(IND_COMP_PORT, () => {
  console.log(`Individual Component server listening on port ${IND_COMP_PORT}`);
});
