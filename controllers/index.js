const router = require("express").Router();
const users = require("./users");
const home = require("./home");

router.use("/", home);
router.use("/dashboard", users);

module.exports = router;
