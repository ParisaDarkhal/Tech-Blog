// Dependencies
const express = require("express"); //
const exphbs = require("express-handlebars"); //
const path = require("path"); //
const session = require("express-session");

const controllers = require("./controllers");
const sequelize = require("./config/connection");

const PORT = process.env.PORT || 3001;

// Sets up the Express App
const app = express();

// set up session
const sess = {
  secret: "Super secret secret",
  resave: false,
  saveUninitialized: false,
};
app.use(session(sess));

// To access the public/front-end content!
app.use(express.static(path.join(__dirname, "/public")));

// to make the tables for the first time
// const models = require("./models");

// sets up handlebars
const hbs = exphbs.create({});

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
