// this is post index file
const router = require("express").Router();
const { BlogPost, Comment, User } = require("../../models");

// localhost:3001/nowpost
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
  });
  const userPosts = dbUserPosts.map((post) => post.get({ plain: true }));

  res.render("dashboard", { userPosts });
});

router.get("/create", (req, res) => {
  res.render("newpost");
});

router.post("/create", async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const userId = req.session.userId;
  const newPost = await BlogPost.create({
    title: title,
    content: content,
    user_id: userId,
  });
  if (newPost) {
    res.redirect("/dashboard");
  }
});

//localhost:3001/posts/comment
router.post("/comment", async (req, res) => {
  try {
    const comment = req.body.comment;
    const blogId = req.body.blogId;
    const username = req.session.fullName;
    const dbUser = await User.findOne({
      where: {
        username: username,
      },
    });
    const dbComment = await Comment.create({
      content: comment,
      blogPost_id: blogId,
      user_id: dbUser.id,
    });
    res.status(200).json({ dbComment, username });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
