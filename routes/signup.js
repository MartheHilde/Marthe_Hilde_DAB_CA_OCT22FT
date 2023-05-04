const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models/index.js');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function (username, password, done) {
    db.Users.findOne({ where: { username: username } })
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
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  db.Users.findByPk(id)
    .then(function (user) {
      done(null, user);
    })
    .catch(function (err) {
      done(err);
    });
});

router.get('/', function (req, res) {
  if (!req.isAuthenticated()) {
    res.render('signup', { user: req.user });
  } else {
    res.redirect('/');
  }
});

router.post('/', function (req, res) {
  db.Users.create({
    fullName: req.body.fullName,
    username: req.body.username,
    password: req.body.password,
    roles: "member"
  })
    .then(function (user) {
      res.redirect('/login');
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).send('Error creating user.');
    });
});

module.exports = router;
