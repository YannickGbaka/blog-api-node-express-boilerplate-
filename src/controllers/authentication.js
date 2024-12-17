const { validationResult } = require("express-validator");
const userService = require("../services/user");

const signup = async (request, response, next) => {
  try {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      return response.status(400).send({ errors: result.array() });
    }

    const { firstName, lastName, email, password } = request.body;

    const userExists = await userService.checkIfExist(email);
    if (userExists) {
      return response
        .status(400)
        .json({ message: "Cette adresse email existe déjà" });
    }

    const user = await userService.register(
      firstName,
      lastName,
      email,
      password
    );
    return response.status(201).json(user);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: "Internal server Error" });
  }
};

module.exports = { signup };
