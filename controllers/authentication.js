const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcryptjs');

passport.use(
  // This function is called when we called passport.authenticate() later. The function is not called directly, and is similar to middleware.
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          console.log('login success');
          return done(null, user);
        } else {
          // passwords do not match!
          console.log('login failure');

          return done(null, false, { message: 'Incorrect password' });
        }
      });
    });
  })
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
