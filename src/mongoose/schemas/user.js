const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  lastName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: mongoose.Schema.Types.String,
    min: 8,
  },
  role: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
