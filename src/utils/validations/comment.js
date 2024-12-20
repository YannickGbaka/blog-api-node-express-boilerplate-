const { body } = require("express-validator");
const postService = require("../../services/post");
const userService = require("../../services/user");

const commentValidationSchema = {
  content: {
    isString: true,
    errorMessage: "The content value should be a text",
    isLength: {
      options: { min: 3 },
      errorMessage: "The content should be at least 3 characters",
    },
  },
  author: {
    isString: true,
    errorMessage: "The author value should be a text id",
    custom: {
      options: async (value) => {
        const user = await userService.findById(value);
        if (!user) {
          throw new Error("Author id is not valid");
        }
        return true;
      },
    },
  },
  post: {
    isString: true,
    errorMessage: "The post value should be a text id",
    custom: {
      options: async (value) => {
        const post = await postService.findOne(value);
        if (!post) {
          throw new Error("Post id is not valid");
        }
        return true;
      },
    },
  },
};

module.exports = commentValidationSchema;
