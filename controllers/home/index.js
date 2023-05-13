// this is controllers/home/index.js
const router = require("express").Router();

// localhost:3001/
router.get("/", (req, res) => {
  const user = req.session.user;

  // for setting the session
  res.render("homepage", { user });
});

// localhost:3001/login
router.get("/login", (req, res) => {
  res.render("login");
});

// localhost:3001/signup
router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
