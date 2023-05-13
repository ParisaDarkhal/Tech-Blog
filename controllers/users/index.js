// this is controllers/users/index.js
const router = require("express").Router();

// localhost:3001/users
router.get("/", (req, res) => {
  res.json("From the user folder!");
});

module.exports = router;
