const { response } = require("express");
const postService = require("../services/post");
const aiService = require("../services/ai");
const { findOne: findOneCategory } = require("../services/category");

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
    const { tags, categories } = request.query;

    const posts = await postService.findAll(
      {
        withAuthor: true,
        withCategories: false,
      },
      tags ? JSON.parse(tags) : [],
      categories ? JSON.parse(categories) : []
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

const publishPost = async (request, response) => {
  try {
    const { id } = request.params;
    const updatedPost = await postService.publishPost(id);
    return response.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ message: "Internal server error" });
  }
};

const draftPost = async (request, response) => {
  try {
    const { id } = request.params;
    const updatedPost = await postService.draftPost(id);
    return response.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ message: "Internal server error" });
  }
};

const generatePost = async (request, response) => {
  try {
    const { category } = request.body;
    const categorieModel = await findOneCategory(category);
    const prompt = `As an expert content creator, write a comprehensive blog post about ${categorieModel.label}. 
    
    Create engaging, well-researched content that provides value to readers. The article should include:
    - A compelling and SEO-friendly title
    - Clear structure with introduction, main points, and conclusion
    - Relevant examples and explanations
    - Professional tone of voice

    Return ONLY a valid JSON object without quote with this exact schema:
    {
      "title": "string (50-60 characters for SEO)",
      "content": "string (800-1200 words, with proper markdown formatting)",
      "categories": ["${categorieModel.id}"],
      "tags": ["string array of 3-5 relevant keywords"]
    }`;

    const data = await aiService.generateResponse(prompt);
    return response.status(201).json(JSON.parse(data));
  } catch (err) {
    console.log(err);
    return response.status(500).json({ message: "Internal server error " });
  }
};

module.exports = { store, index, show, publishPost, draftPost, generatePost };

// 6762e17746d93490d6328599
