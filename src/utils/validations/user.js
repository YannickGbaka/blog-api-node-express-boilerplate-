const validationSchemas = {
  firstName: {
    isString: true,
    errorMessage: "Firstname must be a string",
  },
  lastName: {
    isString: true,
    errorMessage: "Lastname must be a string",
  },
  email: {
    isEmail: true,
    errorMessage: "Email format invalid",
  },
  password: {
    isString: true,
    isLength: {
      options: { min: 8 },
      errorMessage: "Password should be at least 8 character",
    },
  },
};

module.exports = {
  validationSchemas,
};
