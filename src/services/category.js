const { Category } = require("../mongoose/schemas/category");

const findAll = async () => Category.find({});

const save = async ({ label }) => {
  const category = new Category({ label });
  return await category.save();
};

module.exports = { findAll, save };
