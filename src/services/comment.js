const { Comment } = require("../mongoose/schemas/comment");

const create = async ({ content, author, post }) => {
  const comment = new Comment({ content, author, post });
  return await comment.save();
};
const getAllByPost = async (post) => {
  return await Comment.find({ post });
};

module.exports = { create, getAllByPost };
