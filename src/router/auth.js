const { Router } = require("express");
const authController = require("../controllers/authentication");
const { body, checkSchema } = require("express-validator");
const { validationSchemas } = require("../utils/validations/user");

const router = Router();

router.post("/signup", checkSchema(validationSchemas), authController.signup);
router.post(
  "/login",
  [
    body("email").notEmpty().isEmail().withMessage("The email is not valid"),
    body("password").notEmpty().withMessage("The password is not defined"),
  ],
  authController.login
);
module.exports = router;
