const { Post } = require("../mongoose/schemas/post");
const { options } = require("../router/auth");
const cacheService = require("./cache");

const save = async ({ title, content, categories, tags, author }) => {
  const post = new Post({ title, content, categories, tags, author });
  const savedPost = post.save();
  await cacheService.connect();
  const cacheKey = cacheService.generateKey("post", savedPost._id);
  await cacheService.set(cacheKey, savedPost);
  await cacheService.disconnect();
  return savedPost;
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

const findAll = async (options = {}, tags = [], categories = []) => {
  const populate = createPopulateOptions(options);
  const query = {};

  if (tags.length > 0) {
    query.tags = { $in: tags };
  }

  if (categories.length > 0) {
    query.categories = { $in: categories };
  }
  await cacheService.connect();

  const cacheKeyIdentifier = JSON.stringify(populate) + JSON.stringify(query);
  await cacheService.connect();

  const cacheKey = cacheService.generateKey("post", cacheKeyIdentifier);

  const cachedPosts = await cacheService.get(cacheKey);
  if (cachedPosts) {
    await cacheService.disconnect();

    return cachedPosts;
  }

  const posts = await Post.find(query).populate(populate);
  if (posts) {
    await cacheService.set(cacheKey, posts);
  }
  await cacheService.disconnect();

  return posts;
};

const findOne = async (id, options = {}) => {
  await cacheService.connect();

  const cacheKey = cacheService.generateKey("post", id);
  const cachedPost = await cacheService.get(cacheKey);

  if (cachedPost) {
    return cachedPost;
  }
  const populate = createPopulateOptions(options);

  const post = await Post.findById(id).populate(populate);

  if (post) {
    await cacheService.set(cacheKey, post);
  }
  return post;
};

const updatePostStatus = async (id, status) => {
  if (!["published", "draft"].includes(status)) {
    throw new Error("Invalid post status");
  }
  return await Post.findByIdAndUpdate(id, { status }, { new: true });
};

const publishPost = async (id) => updatePostStatus(id, "published");

const draftPost = async (id) => updatePostStatus(id, "draft");

module.exports = { save, findAll, findOne, publishPost, draftPost };
