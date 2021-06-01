const express = require('express');
const router = express.Router();
const authController = require('../controller/authController.js');
require('dotenv').config();

router.get('/github', authController.authenticate, (req, res) => {
  // return res.status(200)
});

router.get('/github/callback', authController.callback, (req, res) => {
  res.redirect('/');
});

router.get('/logout', authController.logout, (req, res) => {
  return res.redirect('/');
});

router.get('/newauth', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

module.exports = router;
