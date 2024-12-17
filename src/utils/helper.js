const SALT_ROUND = 10;
const bcrypt = require("bcrypt");

const hashPassword = (rawPassword) => {
  const salt = bcrypt.genSaltSync(SALT_ROUND);
  return bcrypt.hashSync(rawPassword, salt);
};

const comparePassword = (plain, hashed) => {
  return bcrypt.compareSync(plain, hashed);
};

module.exports = {
  hashPassword,
  comparePassword,
};
