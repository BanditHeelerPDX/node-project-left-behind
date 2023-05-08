const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const auth = require("./utils/auth");
const User = require("./models/User");
const routes = require('./routes');
const bookmarks = require('./bookmarks');
const home = require('./home');
const notes = require('./notes');
const users = require('./users');
const videos = require('./videos');
const sequelize = require("./config/connection");
const sequelizeStore = require("connect-session-sequelize")(session.Store);
const PORT = process.env.PORT || 3030;

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new sequelizeStore({
    db: sequelize,
  }),
};

const app = express();

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());
passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
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
}));

//Register route
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.redirect('/dashboard');
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.use("/bookmarks", bookmarksRoute);
app.use("/index", index.Route);
app.use("/link", linkRoute);
app.use("notes", notesRoute);
app.use("users", usersRoute);
app.use("videos", videosRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `You are now listening to the smooth, sultry sounds of ${PORT}, the Port!`
    )
  );
});
