// this is controllers/home/index.js
const router = require("express").Router();

// localhost:3001/
router.get("/", (req, res) => {
  const user = "parisa";
  res.render("homepage", { user });
});

module.exports = router;
