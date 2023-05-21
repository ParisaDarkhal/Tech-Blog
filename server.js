// Dependencies
const express = require("express"); //
const exphbs = require("express-handlebars"); //
const path = require("path"); //
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const controllers = require("./controllers");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");

const PORT = process.env.PORT || 3001;

// Sets up the Express App
const app = express();

const sess = {
  secret: "Super secret secret",
  cookie: {
    // Stored in milliseconds
    maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// set up session
// const sess = {
//   secret: "Super secret secret",
//   resave: false,
//   saveUninitialized: false,
// };
// app.use(session(sess));

// To access the public/front-end content!
app.use(express.static(path.join(__dirname, "/public")));

// to make the tables for the first time
// const models = require("./models");

// sets up handlebars
const hbs = exphbs.create({ helpers });

// Set Handlebars as the default template engine.
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// to make it possible to make a POST request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(controllers);

// Starts the server to begin listening: first we need to connect to the database and then run the server
sequelize.sync({ force: false }).then(() => {
  // false can be turned to true ONLY first time when I want to make the database
  app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:" + PORT);
  });
});
