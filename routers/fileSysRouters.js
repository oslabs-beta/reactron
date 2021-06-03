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


router.post('/individual', fsController.individualComponent, (req, res) => {
  return res.status(200).send('OK');
});

router.get(
  '/demo',
  fsController.runDemo,
  fsController.runPuppeteer,
  (req, res) => {
    res.status(200);
  }
);

router.post('/prevprojs', fsController.prevProjects, (req, res) => {
  res.status(200).json(res.locals.projects);
});

router.post(
  '/prevupload',
  fsController.prevProjectUpload,
  fsController.runPuppeteer,
  (req, res) => {
    res.status(200).json(res.locals.files);
  }
);

module.exports = router;
