const { Category } = require("../mongoose/schemas/category");

const findAll = async () => Category.find({});

const save = async ({ label }) => {
  const category = new Category({ label });
  return await category.save();
};

const update = async (id, updatedData) => {
  const category = await findOne(id);
  if (!category) {
    throw new Error("Category not found");
  }

  category.label = updatedData.label;
  return await category.save();
};

const findOne = async (id) => await Category.findById(id);

module.exports = { findAll, save, findOne, update };
