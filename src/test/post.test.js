const request = require("supertest");
const app = require("../index");
const { Post } = require("../mongoose/schemas/post");
const { Category } = require("../mongoose/schemas/category");
const User = require("../mongoose/schemas/user");
const jwt = require("jsonwebtoken");

describe("Posts", () => {
  let token;
  let userId;
  let categoryId;

  beforeEach(async () => {
    await Post.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});

    // Create test user
    const user = await User.create({
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      password: "password123",
      role: "author",
    });
    userId = user._id;

    // Create test category
    const category = await Category.create({
      label: "test-category",
    });
    categoryId = category._id;

    // Generate token
    token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  });

  describe("POST /api/v1/posts", () => {
    it("should create a new post", async () => {
      const response = await request(app)
        .post("/api/v1/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Test Post",
          content: "Test content for the post",
          categories: [categoryId],
          tags: ["test", "api"],
          author: userId,
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("_id");
      expect(response.body.title).toBe("Test Post");
    });
  });

  describe("GET /api/v1/posts", () => {
    beforeEach(async () => {
      await Post.create({
        title: "Test Post",
        content: "Test content",
        categories: [categoryId],
        tags: ["test"],
        author: userId,
        status: "published",
      });
    });

    it("should list all posts", async () => {
      const response = await request(app)
        .get("/api/v1/posts")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
    });

    it("should filter posts by tags", async () => {
      const response = await request(app)
        .get("/api/v1/posts")
        .query({ tags: JSON.stringify(["test"]) })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body[0].tags).toContain("test");
    });
  });
});
