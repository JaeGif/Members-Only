const { body, validationResult } = require('express-validator');
const async = require('async');
const User = require('../models/user');
const passport = require('passport');
const bcrypt = require('bcryptjs');

exports.sign_up_form_get = (req, res) => res.render('./partials/sign-up');

exports.user_sign_up = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) return next(err);
    // otherwise, store hashedPassword in DB
    else {
      const user = new User({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        userName: req.body.username,
        password: hashedPassword,
        member: false,
      }).save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    }
  });
};

exports.user_log_in = passport.authenticate('local', {
  successRedirect: '/home', // redirect to this route if logged in
  failureRedirect: '/log-in', // redirect to this route if incorrect login
});

exports.log_out = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
