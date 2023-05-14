// this is controllers/users/index.js
const router = require("express").Router();

// localhost:3001/dashboard
router.get("/", (req, res) => {
  const user = req.session.fullName;
  if (!user) {
    res.redirect("/login");
  }

  const userPosts = [];
  res.render("dashboard", userPosts);
});

module.exports = router;
