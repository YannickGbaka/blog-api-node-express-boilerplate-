const { Router } = require("express");
const controller = require("../controllers/category");

const router = Router();

router.get("/", controller.index);

module.exports = router;
