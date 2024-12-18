const service = require("../services/category");
const index = async (request, response) => {
  try {
    const categories = await service.findAll();
    return response.status(200).json(categories);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { index };
