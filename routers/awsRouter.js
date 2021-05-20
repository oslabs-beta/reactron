const express = require('express');
const router = express.Router();
const awsController = require('../controller/awsController.js');

router.post('/upload', awsController.placeFile, (req, res) => {
  res.status(200);
});

module.exports = router;
