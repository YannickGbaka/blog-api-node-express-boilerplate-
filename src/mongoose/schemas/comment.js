const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minLength: 3,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
    index: true,
  },
  post: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Post",
    index: true,
  },
  createdAt: {
    type: Date,
    value: Date.now,
    immutable: true,
  },
  updatedAt: {
    type: Date,
    value: Date.now,
  },
});

CommentSchema.pre("save", function (next) {
  if (this.isModified()) {
    this.updatedAt = Date.now;
  }
  next();
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = { Comment };
