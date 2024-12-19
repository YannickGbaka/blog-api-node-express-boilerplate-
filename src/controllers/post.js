const postService = require("../services/post");

const { matchedData, validationResult } = require("express-validator");

const store = async (request, response) => {
  try {
    const result = validationResult(request);
    if (!result.isEmpty())
      return response.status(400).json({ errors: result.array() });

    const postData = matchedData(request);
    const post = await postService.save(postData);
    return response.status(201).json(post);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { store };
