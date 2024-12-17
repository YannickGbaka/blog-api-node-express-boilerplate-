const { Router } = require("express");
const authController = require("../controllers/authentication");
const { body, checkSchema } = require("express-validator");
const { validationSchemas } = require("../utils/validations/user");

const router = Router();

router.post("/signup", checkSchema(validationSchemas), authController.signup);

module.exports = router;
