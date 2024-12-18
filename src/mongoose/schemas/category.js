const mongoose = require("mongoose");

const PostCategorySchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    minLength: 3,
    trim: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

PostCategorySchema.pre("save", function (next) {
  if (this.isModified()) {
    this.updatedAt = Date.now();
  }
  next();
});

const Category = mongoose.model("Category", PostCategorySchema);
module.exports = { Category };
