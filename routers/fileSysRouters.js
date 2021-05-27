const express = require('express');
const router = express.Router();
const fsController = require('../controller/fsController.js');

router.post(
  '/upload',
  fsController.saveFiles,
  // fsController.runPuppeteer,
  (req, res) => {
    res.status(200);
  }
);

router.post('/stylesheet', fsController.stylesheet, (req, res) => {
  res.status(200);
});

router.get('/rerender', fsController.runPuppeteer, (req, res) => {
  res.status(200);
});

router.post('/individual', fsController.individualComponent, (req, res) => {
  res.status(200);
});

module.exports = router;
