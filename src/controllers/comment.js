const { validationResult, matchedData } = require("express-validator");
const commentService = require("../services/comment");

const store = async (request, response) => {
  try {
    const result = validationResult(request);
    if (!result.isEmpty())
      return response.status(400).json({ errors: result.array() });

    const comment = await commentService.create(matchedData(request));

    return response.status(201).json(comment);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { store };
