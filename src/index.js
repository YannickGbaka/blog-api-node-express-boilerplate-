const express = require("express");
const authRoutes = require("./router/auth");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
