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

// const sess = {
//   secret: "Super secret secret",
//   cookie: {
//     // Stored in milliseconds
//     maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
//   },
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize,
//   }),
// };

// set up session
// create database, ensure 'sqlite3' in your package.json
// var sequelize = new Sequelize("database", "username", "password", {
// dialect: "sqlite",
// storage: "./session.sqlite",
// });

// configure express
app.use(
  session({
    secret: "keyboard cat",
    cookie: {
      // Stored in milliseconds
      maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
    },
    // store: myStore,
    store: new SequelizeStore({
      db: sequelize,
    }),
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true, // if you do SSL outside of node.
  })
);

// myStore.sync();
// const sess = {
//   secret: "Super secret secret",
//   resave: false,
//   saveUninitialized: false,
// };
// app.use(session(sess));

// to make the tables for the first time
// const models = require("./models");

// sets up handlebars
const hbs = exphbs.create({ helpers });

// to make it possible to make a POST request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// To access the public/front-end content!
app.use(express.static(path.join(__dirname, "/public")));

// Set Handlebars as the default template engine.
app.engine("handlebars", hbs.engine);
// app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

app.use(controllers);

// Starts the server to begin listening: first we need to connect to the database and then run the server
sequelize.sync({ force: false }).then(() => {
  // false can be turned to true ONLY first time when I want to make the database
  app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:" + PORT);
  });
});
