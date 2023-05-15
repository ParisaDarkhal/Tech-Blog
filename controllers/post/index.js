// this is post index file
const router = require("express").Router();

// localhost:3001/nowpost
router.get("/", (req, res) => {
  const userPosts = [];
  res.render("dashboard", userPosts);
});

router.get("/create", (req, res) => {
  res.render("newpost");
});

module.exports = router;
