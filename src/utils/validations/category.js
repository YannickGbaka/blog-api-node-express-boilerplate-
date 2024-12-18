const { body, param } = require("express-validator");
const { Category } = require("../../mongoose/schemas/category");
const service = require("../../services/category");

const categoryValidation = {
  create: [
    body("label")
      .notEmpty()
      .withMessage("The label is not defined")
      .isLength({ min: 3 })
      .withMessage("The label length should be at least 3 characters")
      .custom(async (value) => {
        const category = await Category.findOne({ label: value });
        if (category) {
          throw new Error("category is already defined");
        }
        return true; // Don't forget to return true for successful validation
      }),
  ],
  // You can add more validation chains here for other operations
  update: [
    body("label")
      .notEmpty()
      .withMessage("The label is not defined")
      .isLength({ min: 3 })
      .withMessage("The label length should be at least 3 characters"),
  ],
  // delete: [...],
};
module.exports = categoryValidation;
