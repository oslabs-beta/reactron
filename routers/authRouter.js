const express = require('express');
const router = express.Router();
const authController = require('../controller/authController.js')

router.get('/github', authController.authenticate, (req, res) => {
  return res.status(200)
})

router.get('/github/callback', authController.callback, (req, res) => {
  console.log('req.user', req.user)
  return res.redirect('/')
})

module.exports = router;