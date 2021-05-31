const express = require('express');
const router = express.Router();
const authController = require('../controller/authController.js');

router.get('/github', authController.authenticate, (req, res) => {
  // return res.status(200)
});

router.get('/github/callback', authController.callback, (req, res) => {
  res.redirect('/');
});

router.get('/logout', authController.logout, (req, res) => {
  return res.redirect('/');
});

module.exports = router;
