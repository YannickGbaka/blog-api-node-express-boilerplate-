const express = require("express");
const authRoutes = require("./router/auth");
const categoryRoutes = require("./router/category");
const postRoutes = require("./router/post");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
require("./strategies/jwt-strategy");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.query());

app.use("/api/v1/auth", authRoutes);
app.use(
  "/api/v1/categories",
  passport.authenticate("jwt", { session: false }),
  categoryRoutes
);
app.use(
  "/api/v1/posts",
  passport.authenticate("jwt", { session: false }),
  postRoutes
);

module.exports = app;
