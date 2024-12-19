const { Router } = require("express");
const controller = require("../controllers/post");
const { PostValidationSchema } = require("../utils/validations/post");
const { checkSchema } = require("express-validator");

const router = Router();
router.post("/", checkSchema(PostValidationSchema), controller.store);
router.get("/", controller.index);

module.exports = router;
