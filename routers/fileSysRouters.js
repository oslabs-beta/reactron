const express = require('express');
const router = express.Router();
const fsController = require('../controller/fsController.js');

router.post('/upload', fsController.uploadFiles, (req, res) => {
  res.status(200);
});

router.post('/stylesheet', fsController.stylesheet, (req, res) => {
  res.status(200);
});

module.exports = router;
