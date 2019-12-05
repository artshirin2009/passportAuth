var express = require('express');
var router = express.Router();
let passport = require('passport');
require('../../libs/passport.js');

router.get('/facebook',
  passport.authenticate('facebook', {
    scope: ['email']
  }));

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/auth/login'
  }),
  function (req, res) {
    res.redirect('/auth/profile')
  });

router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/login'
  }),
  function (req, res) {
    res.redirect('/auth/profile');
  });

router.get('/profile', isLoggedIn, function (req, res) {
  res.json({
    user: req.user
  });
})

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/auth/login');
})

router.get('/login',
  function (req, res) {
    res.json({
      'title': "Login page"
    })
  });
  
module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/auth/login')
}