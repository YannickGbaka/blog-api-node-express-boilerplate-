const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
  },
  content: {
    type: String,
    required: true,
    minLength: 10,
  },
  categoryIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Category",
    required: true,
    validate: {
      validator: (array) => array.length > 0,
      message: "Post must have at least one category",
    },
  },
  tags: {
    type: [String],
    required: true,
    validate: {
      validator: (array) => array.length > 0,
      message: "Post must have at least one tag",
    },
    set: (tags) => tags.map((tag) => tag.toLowerCase().trim()),
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
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

PostSchema.pre("save", function (next) {
  if (this.isModified()) {
    this.updatedAt = Date.now();
  }
  next();
});

const Post = mongoose.model("Post", PostSchema);

module.exports = { Post };
