const { Post } = require("../mongoose/schemas/post");

const save = async ({ title, content, categoryIds, tags, authorId }) => {
  const post = new Post({ title, content, categoryIds, tags, authorId });
  return await post.save();
};

module.exports = { save };
