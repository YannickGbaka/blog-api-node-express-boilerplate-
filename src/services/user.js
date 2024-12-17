const User = require("../mongoose/schemas/user");
const { hashPassword } = require("../utils/helper");

const register = async (firstName, lastName, email, password) => {
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashPassword(password),
  });
  console.log(newUser);
  const savedUser = await newUser.save();
  return savedUser;
};

const checkIfExist = async (email) => {
  const foundUser = await User.findOne({ email });
  if (!foundUser) return false;
  return true;
};

module.exports = { register, checkIfExist };
