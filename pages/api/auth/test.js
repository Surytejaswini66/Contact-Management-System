import request from "supertest";
import app from "../server"; // Import your server

describe("POST /api/auth/register", () => {
  it("should register a new user and trigger email verification", async () => {
    const response = await request(app).post("/api/auth/register").send({
      name: "Surya Tejaswini",
      email: "suryaviswanadhapalli666@gmail.com", // Use a real email address here
      password: "tfag#3_6f",
    });

    // Assert the response status and message
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "User registered. Please check your email to verify."
    );
  });
});
