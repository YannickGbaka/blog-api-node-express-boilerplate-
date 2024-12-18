const { Category } = require("../mongoose/schemas/category");

const findAll = async () => Category.find({});

module.exports = { findAll };
