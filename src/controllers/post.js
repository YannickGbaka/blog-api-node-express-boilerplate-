const postService = require("../services/post");

const { matchedData, validationResult, param } = require("express-validator");

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

const index = async (request, response) => {
  try {
    const { tags } = request.query;

    const posts = await postService.findAll(
      {
        withAuthor: true,
        withCategories: false,
      },
      tags ? JSON.parse(tags) : []
    );
    return response.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ message: "Internal server error" });
  }
};

const show = async (request, response) => {
  try {
    const { id } = request.params;
    const post = await postService.findOne(id, {
      withAuthor: true,
      withCategories: true,
    });
    return response.status(200).json(post);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { store, index, show };
