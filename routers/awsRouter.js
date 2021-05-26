const express = require('express');
const router = express.Router();
const awsController = require('../controller/awsController.js');

router.post('/upload', awsController.placeFile, (req, res) => {
  res.status(200);
});

router.get('/retrieve/:key', awsController.getFile, (req, res) => {
  console.log(res.locals.data);
  res.send('success');
});

module.exports = router;
