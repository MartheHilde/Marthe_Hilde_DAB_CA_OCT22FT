const express = require('express');
var router = express.Router();
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const db = require("../models/index.js");
const User = db.Users;

// configure Passport
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findByPk(id)
        .then(function (user) {
            done(null, user);
        })
        .catch(function (err) {
            done(err);
        });
});

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, function (username, password, done) {
    User.findOne({ where: { username: username } })
        .then(function (user) {
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.password !== password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        })
        .catch(function (err) {
            return done(err);
        });
}));


// define routes
router.post('/password', passport.authenticate('local', {
    successRedirect: '/animals',
    failureRedirect: '/login'
}));

router.get('/', function (req, res, next) {
    if (!req.user) {
        res.render('login', { user: req.user });
    } else {
        res.render('login', { user: req.user });
    }
});

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
});
module.exports = router;
