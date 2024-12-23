const { Router } = require("express");
const controller = require("../controllers/post");
const { PostValidationSchema } = require("../utils/validations/post");
const { checkSchema, param } = require("express-validator");
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
router.delete(
  "/:postId/comments/:commentId",
  [
    param("postId").notEmpty().withMessage("The post id is not defined"),
    param("commentId").notEmpty().withMessage("The comment id is not defined"),
  ],
  commentController.remove
);
module.exports = router;
