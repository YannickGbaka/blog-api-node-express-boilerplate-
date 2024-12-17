const { Router } = require("express");

const router = Router();

router.get("/login", (request, response, next) => {
  return response.json({ message: "Login using credentials" });
});

module.exports = router;
