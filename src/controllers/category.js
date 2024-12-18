const service = require("../services/category");
const { validationResult, matchedData } = require("express-validator");

const index = async (request, response) => {
  try {
    const categories = await service.findAll();
    return response.status(200).json(categories);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: "Internal server error" });
  }
};

const store = async (request, response) => {
  try {
    const result = validationResult(request);
    if (!result.isEmpty()) return response.status(400).json(result.array());
    const validatedData = matchedData(request);
    const savedData = await service.save(validatedData);
    return response.status(201).json(savedData);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { index, store };
