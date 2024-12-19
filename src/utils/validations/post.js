const userService = require("../../services/user");
const categoryService = require("../../services/category");

const PostValidationSchema = {
  title: {
    isString: true,
    errorMessage: "Title must be a string",
    isLength: {
      options: { min: 3, max: 100 },
      errorMessage: "Title must be a string and between 3 and 100 characters",
    },
  },
  content: {
    isString: true,
    errorMessage: "Content must be a string",
    isLength: {
      options: { min: 10 },
      errorMessage: "Content must be at least 10 characters",
    },
  },
  categories: {
    isArray: true,
    errorMessage: "categories must be an array",
    isLength: {
      options: { min: 1 },
      errorMessage: "categories must have at least one category",
    },
    custom: {
      options: async (value) => {
        for (const categoryId of value) {
          const category = await categoryService.findOne(categoryId);
          if (!category) {
            throw new Error(`Category with id (${categoryId}) does not exist`);
          }
        }
        return true;
      },
    },
  },
  tags: {
    isArray: true,
    errorMessage: "Tags must be an array",
    isLength: {
      options: { min: 1 },
      errorMessage: "Tags must have at least one tag",
    },
  },
  author: {
    isString: true,
    errorMessage: "author must be a string",
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
};

module.exports = {
  PostValidationSchema,
};
