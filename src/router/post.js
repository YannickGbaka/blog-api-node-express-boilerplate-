const { Router } = require("express");
const controller = require("../controllers/post");
const { PostValidationSchema } = require("../utils/validations/post");
const { checkSchema } = require("express-validator");
const commentController = require("../controllers/comment");
const commentValidationSchema = require("../utils/validations/comment");

const router = Router();
router.post("/", checkSchema(PostValidationSchema), controller.store);
router.get("/", controller.index);
router.get("/:id", controller.show);

router.post(
  "/:postId/comments",
  checkSchema(commentValidationSchema),
  commentController.store
);
router.get("/:postId/comments", commentController.index);
module.exports = router;
