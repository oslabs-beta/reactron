const GitHubStrategy = require('passport-github').Strategy;
const passport = require('passport');
const session = require('express-session');
const fs = require('fs');
require('dotenv').config();

const authController = {};

// session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: true,
//     secure: false, //this would be set to true if using https
//     maxAge: 24 * 60 * 60 * 1000
//   },
// })

passport.initialize();
passport.session();
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
  cb(null, id);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: 'http://localhost:3000/auth/github/callback', //will need to change this later to to reactron.io/auth/github/callback
    },
    (accessToken, refreshToken, profile, cb) => {
      //this is where we'd send a datapase request to store user id?
      console.log(profile.username);
      return cb(null, profile);
    }
  )
);

authController.authenticate = (req, res, next) => {
  passport.authenticate('github')(req, res, next);
  return next();
};

authController.callback = (req, res, next) => {
  passport.authenticate('github', { failureRedirect: '/failure' })(
    req,
    res,
    next
  );
  res.cookie('username', 'This is not connected to github yet!');
  return next();
};

// authController.isAuth = (req, res, next) = {
//   if (req.user){
//     next()
//   } else {

//   }
// }

authController.logout = (req, res, next) => {
  req.logout();
  delete req.session;
  return next();
};

module.exports = authController;
