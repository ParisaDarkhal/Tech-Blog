// this is controllers/home/index.js
const router = require("express").Router();
// const { Model } = require("sequelize");
const { User, BlogPost } = require("../../models");
const bcrypt = require("bcrypt");

// localhost:3001/
router.get("/", async (req, res) => {
  console.log("Session Data:", req.session);
  let user;
  console.log("======================");
  if (req.session.fullName) {
    user = req.session.fullName;
  }
  const dbPosts = await BlogPost.findAll({
    include: [{ model: User }],
    order: [["date", "DESC"]],
  });
  const allPosts = dbPosts.map((post) => post.get({ plain: true }));

  console.log("user from home :>> ", user);
  if (user) {
    res.render("homepage", { allPosts, user });
  } else {
    res.render("login"); // Render the login view instead of the homepage
  }
});

// localhost:3001/login
router.get("/login", (req, res) => {
  console.log("req.session :>> ", req.session);
  if (!req.session.fullName) {
    res.render("login");
  } else {
    res.redirect("/");
  }
});

// localhost:3001/login
router.post("/login", async (req, res) => {
  const username = req.body.username;
  const userData = await User.findOne({
    where: {
      username: username,
    },
  });

  if (!userData) {
    res.render("login", {
      message: "Invalid username/password. Please try again.",
    });
    return;
  }
  const validPassword = await userData.checkPassword(req.body.password);

  if (!validPassword) {
    res.render("login", {
      message: "Invalid username/password. Please try again.",
    });
    return;
  }
  const dbPosts = await BlogPost.findAll({
    include: [{ model: User }],
    order: [["date", "DESC"]],
  });
  const allPosts = dbPosts.map((post) => post.get({ plain: true }));

  req.session.save(() => {
    req.session.fullName = userData.username; //the word fullName after session is the name of this new variable
    req.session.userId = userData.id;
    console.log("req.session from login post :>> ", req.session);
    res.redirect("/");
    // res.render("homepage", { allPosts, user: userData.username });
    return;
  });
});

// localhost:3001/signup
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // checks if the username already exists
  const existingUser = await User.findOne({
    where: {
      username: username,
    },
  });
  if (existingUser) {
    res.render("signup", {
      message: "Username already exists. Please choose another username.",
    });
    return;
  }

  const userData = await User.create({
    username: username,
    password: password,
  });
  // sets the session for the posted username
  if (userData.username) {
    req.session.save(() => {
      req.session.fullName = userData.username; //the word fullName after session is the name of this new variable
    });
  }

  res.redirect("/");
});

// localhost:3001/signup
router.get("/signup", (req, res) => {
  res.render("signup");
});

// localhost:3001/logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

// checks if the user is logged in or not
router.get("/checkUser", (req, res) => {
  const user = req.session.fullName;
  res.json({ userName: user });
});

module.exports = router;
