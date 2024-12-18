const { validationResult, matchedData } = require("express-validator");
const userService = require("../services/user");
const { comparePassword } = require("../utils/helper");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (request, response, next) => {
  try {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      return response.status(400).send({ errors: result.array() });
    }

    const { firstName, lastName, email, password, role } = request.body;

    const user = await userService.register(
      firstName,
      lastName,
      email,
      password,
      role
    );
    return response.status(201).json(user);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: "Internal server Error" });
  }
};

const login = async (request, response) => {
  try {
    const result = validationResult(request);
    if (!result.isEmpty())
      return response.status(400).json({ errors: result.array() });

    const { email, password } = matchedData(request);
    const user = await userService.findByEmail(email);

    if (!user)
      return response
        .status(401)
        .json({ error: "Authentication failed, check credentials" });

    if (!comparePassword(password, user.password))
      return response
        .status(401)
        .json({ error: "Authentication failed, check credentials" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return response.status(200).json({ token });
  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: "Internal server error" }); // Fixed status code and error message
  }
};

module.exports = { signup, login };
