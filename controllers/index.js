const router = require("express").Router();
const users = require("./users");
const home = require("./home");
const posts = require("./post");

router.use("/", home);
router.use("/dashboard", users);
router.use("/posts", posts);

module.exports = router;
