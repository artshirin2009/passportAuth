let passport = require('passport')
let User = require('../models/user.js')
let auth = require('../config/auth.js')

let FacebookStrategy = require('passport-facebook')
let GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new FacebookStrategy(auth.facebook,
    function (accessToken, refreshToken, profile, cb) {
        const updateObj = {
            "facebook.id": profile.id,
            "facebook.token": accessToken,
            "facebook.name": profile.name.givenName + ' ' + profile.name.familyName,
            "facebook.email": profile.emails[0].value
        };
        User.findOneAndUpdate({
                'google.email': profile.emails[0].value
            }, updateObj, {
                new: true
            }).exec()
            .then(user => {
                let result;
                if (user) {
                    result = user
                } else {
                    let newUser = new User();
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = accessToken;
                    newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                    newUser.facebook.email = profile.emails[0].value
                    newUser.save()
                    result = newUser
                }
                return cb(null, result)
            })
            .catch(err => {
                console.log(err)
            })
    }
));


passport.use(new GoogleStrategy(auth.google,
    function (accessToken, refreshToken, profile, cb) {
        const updateObj = {
            "google.id": profile.id,
            "google.token": accessToken,
            "google.name": profile.name.givenName + ' ' + profile.name.familyName,
            "google.email": profile.emails[0].value
        };
        User.findOneAndUpdate({
                'facebook.email': profile.emails[0].value
            }, updateObj, {
                new: true
            }).exec()
            .then(user => {
                let result;
                if (user) {
                    result = user
                }
                else{
                  let newUser = new User();
                newUser.google.id = profile.id;
                newUser.google.token = accessToken;
                newUser.google.name = profile.name.givenName + ' ' + profile.name.familyName;
                newUser.google.email = profile.emails[0].value
                newUser.save()
                result = newUser  
                }
                return cb(null, result)
            })
            .catch(err => {
                console.log(err)
            })
    }
));