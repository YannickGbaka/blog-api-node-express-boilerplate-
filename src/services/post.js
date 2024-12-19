const { Post } = require("../mongoose/schemas/post");
const { options } = require("../router/auth");

const save = async ({ title, content, categories, tags, author }) => {
  const post = new Post({ title, content, categories, tags, author });
  return await post.save();
};

const createPopulateOptions = ({
  withAuthor = false,
  withCategories = false,
}) => {
  const populate = [];
  if (withAuthor) populate.push("author");
  if (withCategories) populate.push("categories");
  return populate;
};

const findAll = async (options = {}) => {
  const populate = createPopulateOptions(options);
  return await Post.find().populate(["author", "categories"]);
};

const findOne = async (id, options = {}) => {
  const populate = createPopulateOptions(options);
  return await Post.findById(id).populate(populate);
};

module.exports = { save, findAll, findOne };
