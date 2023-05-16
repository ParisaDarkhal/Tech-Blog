// this is controllers/home/index.js
const router = require("express").Router();
const { User, BlogPost } = require("../../models");
const bcrypt = require("bcrypt");

// localhost:3001/
router.get("/", async (req, res) => {
  const user = req.session.fullName;

  const dbUsersPosts = await BlogPost.findAll({
    include: [
      {
        model: User,
        required: true,
      },
    ],
    order: [["date", "DESC"]],
  });
  const usersPosts = dbUsersPosts.map((post) => post.get({ plain: true }));

  // for setting the session
  res.render("homepage", { usersPosts, user });
});

// localhost:3001/login
router.get("/login", (req, res) => {
  res.render("login");
});

// localhost:3001/login
router.post("/login", async (req, res) => {
  const username = req.body.username;
  // const password = await bcrypt.hash(req.body.password, 10);
  // console.log(password);

  const userData = await User.findOne({
    where: {
      username: username,
    },
  });

  // sets the session for the posted username
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
  req.session.fullName = userData.username; //the word fullName after session is the name of this new variable
  req.session.userId = userData.id;
  res.redirect("/");
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
    req.session.fullName = userData.username; //the word fullName after session is the name of this new variable
  }

  res.redirect("/");
});

// localhost:3001/signup
router.get("/signup", (req, res) => {
  res.render("signup");
});

// localhost:3001/logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// checks if the user is logged in or not
router.get("/checkUser", (req, res) => {
  const user = req.session.fullName;
  console.log(user);
  res.json({ userName: user });
});

module.exports = router;
