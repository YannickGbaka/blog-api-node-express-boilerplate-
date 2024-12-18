const { checkIfExist } = require("../../services/user");

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
    custom: {
      options: async (value) => {
        const exists = await checkIfExist(value);
        if (exists) {
          throw new Error("Cette adresse email existe déjà");
        }
        return true;
      },
    },
  },
  password: {
    isString: true,
    isLength: {
      options: { min: 8 },
      errorMessage: "Password should be at least 8 character",
    },
  },
  role: {
    isString: true,
    isIn: {
      options: [["author", "admin", "reader"]],
      errorMessage: "Role must be one of: author, admin, reader",
    },
  },
};

module.exports = {
  validationSchemas,
};
