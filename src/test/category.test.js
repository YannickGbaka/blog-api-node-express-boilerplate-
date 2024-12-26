const request = require("supertest");
const app = require("../index");
const { Category } = require("../mongoose/schemas/category");
const User = require("../mongoose/schemas/user");
const jwt = require("jsonwebtoken");

describe("Categories", () => {
  let token;

  beforeEach(async () => {
    await Category.deleteMany({});
    await User.deleteMany({});

    // Create admin user
    const user = await User.create({
      firstName: "Admin",
      lastName: "User",
      email: "admin@example.com",
      password: "password123",
      role: "admin",
    });

    // Generate token
    token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  });

  describe("POST /api/v1/categories", () => {
    it("should create a new category", async () => {
      const response = await request(app)
        .post("/api/v1/categories")
        .set("Authorization", `Bearer ${token}`)
        .send({
          label: "test-category",
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("_id");
      expect(response.body.label).toBe("test-category");
    });

    it("should prevent duplicate categories", async () => {
      await Category.create({ label: "test-category" });

      const response = await request(app)
        .post("/api/v1/categories")
        .set("Authorization", `Bearer ${token}`)
        .send({
          label: "test-category",
        });

      expect(response.status).toBe(400);
    });
  });

  describe("GET /api/v1/categories", () => {
    beforeEach(async () => {
      await Category.create({ label: "test-category-1" });
      await Category.create({ label: "test-category-2" });
    });

    it("should list all categories", async () => {
      const response = await request(app)
        .get("/api/v1/categories")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBe(2);
    });
  });
});
