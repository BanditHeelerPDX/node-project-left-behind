const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }
      return done(null, user);
    } catch (err) {
      done(err);
    }
  }
));

module.exports = {
  isAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  },
  login: (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.render('login', { message: info.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect('/dashboard');
      });
    })(req, res, next);
  },
  logout: (req, res) => {
    req.logout();
    res.redirect('/');
  }
};