const { Post } = require("../mongoose/schemas/post");

const save = async ({ title, content, categories, tags, author }) => {
  const post = new Post({ title, content, categories, tags, author });
  return await post.save();
};

const findAll = async () => {
  return await Post.find().populate(["author", "categories"]);
};

module.exports = { save, findAll };
