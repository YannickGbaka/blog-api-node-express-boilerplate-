const request = require("supertest");
const app = require("../index");
const { Comment } = require("../mongoose/schemas/comment");
const { Post } = require("../mongoose/schemas/post");
const User = require("../mongoose/schemas/user");
const jwt = require("jsonwebtoken");
const { Category } = require("../mongoose/schemas/category");

describe("Comments", () => {
  let token;
  let userId;
  let postId;

  beforeEach(async () => {
    await Comment.deleteMany({});
    await Post.deleteMany({});
    await User.deleteMany({});
    await Category.deleteMany({});

    // Create test user
    const user = await User.create({
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      password: "password123",
      role: "author",
    });
    userId = user._id;

    const category = await Category.create({
      label: "test-category",
    });
    categoryId = category._id;

    // Create test post
    const post = await Post.create({
      title: "Test Post",
      content: "Test content",
      categories: [categoryId],
      tags: ["test"],
      author: userId,
    });
    postId = post._id;

    // Generate token
    token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  });

  describe("POST /api/v1/posts/:postId/comments", () => {
    it("should create a new comment", async () => {
      const response = await request(app)
        .post(`/api/v1/posts/${postId}/comments`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          content: "Test comment",
          author: userId,
          post: postId,
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("_id");
      expect(response.body.content).toBe("Test comment");
    });
  });

  describe("GET /api/v1/posts/:postId/comments", () => {
    beforeEach(async () => {
      await Comment.create({
        content: "Test comment",
        author: userId,
        post: postId,
      });
    });

    it("should list all comments for a post", async () => {
      const response = await request(app)
        .get(`/api/v1/posts/${postId}/comments`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});
