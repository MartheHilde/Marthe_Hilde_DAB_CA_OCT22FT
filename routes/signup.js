const passport = require('passport');
const express = require('express');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const db = require("../models/index.js");
var router = express.Router();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

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

router.get('/', function (req, res) {
    if (!req.user) {
        res.render('signup', { user: req.user });
    }
});

router.post('/signup', function (req, res) {
    db.Users.create({
            fullName: req.body.fullName,
            username: req.body.username,
            password: req.body.password,
            roles: "user"
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
