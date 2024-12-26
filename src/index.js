const express = require("express");

const authRoutes = require("./router/auth");
const categoryRoutes = require("./router/category");
const postRoutes = require("./router/post");
const cors = require("cors");

const mongoose = require("mongoose");
const passport = require("passport");
require("./strategies/jwt-strategy");
require("dotenv").config();

mongoose
  .connect(`${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.query());

const PORT = process.env.PORT || 3000;

app.use("/api/v1/auth", authRoutes);
app.use(
  "/api/v1/categories",
  // passport.authenticate("jwt", { session: false }),
  categoryRoutes
);
app.use(
  "/api/v1/posts",
  passport.authenticate("jwt", { session: false }),
  postRoutes
);

app.post(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    res.status(200).json({ message: "Access granted" });
  }
);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
