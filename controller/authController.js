
const GitHubStrategy = require('passport-github').Strategy;
const passport = require('passport');
const session = require('express-session');

const authController = {};

session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: true,
    secure: false, //this would be set to true if using https
    maxAge: 24 * 60 * 60 * 1000
  },
})
 
passport.initialize();
passport.session();
passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
  cb(null, id)
})

passport.use(
  new GitHubStrategy(
    {
      clientID: "4cb4ea25d877f5489fd4",
      clientSecret: "236d9d52df6b9605a68eff703813ccda95fbc7dc",
      callbackURL: 'http://localhost:3000/auth/github/callback'//will need to change this later to to reactron.io/auth/github/callback
    },
    (accessToken, refreshToken, profile, cb) => {
      //this is where we'd send a datapase request to store user id?
      console.log(profile.username)
      return cb(null, profile)
    }
  )
)

authController.authenticate = (req, res, next) => {
  
  // console.log('made it to authcontroller')
  passport.authenticate('github')(req, res, next)
  // console.log('madeit past quthenticate')
  return next()
}

authController.callback = (req, res, next) => {
  console.log('in callback controller')
  passport.authenticate('github',{failureRedirect: '/failure'})(req, res, next)
  // console.log('leaving callback controller')
  return next();
}

module.exports = authController;