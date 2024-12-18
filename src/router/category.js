const { Router } = require("express");
const controller = require("../controllers/category");
const { body } = require("express-validator");
const { Category } = require("../mongoose/schemas/category");
const categoryValidation = require("../utils/validations/category");

const router = Router();

router.get("/", controller.index);
router.post("/", categoryValidation.create, controller.store);
router.put("/:id", controller.put);
router.delete("/:id", controller.destroy);
module.exports = router;
