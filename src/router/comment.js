const { Router } = require("express");
const commentController = require("../controllers/comment");
const { checkSchema } = require("express-validator");

const router = Router();

router.post("/", checkSchema(commentValidationSchema), commentController.store);

module.exports = { router };
