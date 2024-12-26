const app = require("./index");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

mongoose
  .connect(`${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
