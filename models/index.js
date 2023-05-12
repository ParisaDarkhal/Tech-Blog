const User = require("./User");
const BlogPost = require("./BlogPost");
const Comment = require("./Comment");

Usere.hasMany(BlogPost, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

BlogPost.belongsTo(User, {
  foreignKey: "User_id",
});

Usere.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "User_id",
});

module.exports = { User, BlogPost, Comment };
