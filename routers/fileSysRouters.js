const express = require('express');
const router = express.Router();
const fsController = require('../controller/fsController.js');

router.post('/upload', fsController.uploadFiles, (req, res) => {
  res.send('this worked');
});

module.exports = router;
