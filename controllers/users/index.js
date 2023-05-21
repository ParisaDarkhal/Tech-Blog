// this is controllers/users/index.js
const router = require("express").Router();
const { BlogPost, User } = require("../../models");

// localhost:3001/dashboard
router.get("/", async (req, res) => {
  const user = req.session.fullName;

  if (!user) {
    res.redirect("/login");
    return;
  }

  const userId = req.session.userId;
  const dbUserPosts = await BlogPost.findAll({
    include: [
      {
        model: User,
        where: {
          id: userId,
        },
      },
    ],
    order: [["date", "DESC"]],
  });
  const userPosts = dbUserPosts.map((post) => post.get({ plain: true }));
  console.log("user from dashboard :>> ", user);
  res.render("dashboard", { userPosts, user });
});

module.exports = router;
