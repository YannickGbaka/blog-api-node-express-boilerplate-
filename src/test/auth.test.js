const request = require("supertest");
const app = require("../index");
const User = require("../mongoose/schemas/user");
const { hashPassword } = require("../utils/helper");

describe("Authentication", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST /api/v1/auth/signup", () => {
    it("should create a new user", async () => {
      const response = await request(app).post("/api/v1/auth/signup").send({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "password123",
        role: "author",
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("_id");
      expect(response.body.email).toBe("john@example.com");
    });

    it("should validate required fields", async () => {
      const response = await request(app).post("/api/v1/auth/signup").send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
    });
  });

  describe("POST /api/v1/auth/login", () => {
    beforeEach(async () => {
      await User.create({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: hashPassword("password123"),
        role: "author",
      });
    });

    it("should login with valid credentials", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        email: "john@example.com",
        password: "password123",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });

    it("should reject invalid credentials", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        email: "john@example.com",
        password: "wrongpassword",
      });

      expect(response.status).toBe(401);
    });
  });
});
