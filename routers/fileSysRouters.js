const express = require('express');
const router = express.Router();
const fsController = require('../controller/fsController.js');

router.post( 
  '/upload',
  fsController.saveFiles,
  fsController.runPuppeteer,
  (req, res) => {
    return res.status(200).send('OK');
  }
);

router.post('/stylesheet', fsController.stylesheet, (req, res) => {
  return res.status(200).send('OK');
});

// router.get('/rerender', fsController.runPuppeteer, (req, res) => {
//   return res.status(200).send('OK');
// });

router.post('/individual', fsController.individualComponent, (req, res) => {
  return res.status(200).send('OK');
});

module.exports = router;
