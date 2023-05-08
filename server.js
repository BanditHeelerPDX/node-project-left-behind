const express = require("express");
const session = require("express-session");
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
