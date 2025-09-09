import request from "supertest";
import app from "../app"; // your express app
import { it, describe, expect, beforeAll, afterAll } from "vitest";
import { connectTestDB, disconnectTestDB, } from "./setupTestDB";


beforeAll(async () => {
   await connectTestDB();
});

afterAll(async () => {
   await disconnectTestDB();
});

describe("Auth: User Registration", () => {
  it("should register a new user and return tokens", async () => {
    const payload = {
      firstName: "Akshay",
      lastName: "Panicker",
      email: "akshay@example.com",
      password: "StrongPassword123",
    };

    const res = await request(app)
      .post("/auth/signup") // adjust route as in your routes
      .send(payload);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Account registed successfully");
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");
    expect(res.body.success).toEqual(true);
  });

  it("should fail when email already exists", async () => {
    const payload = {
      firstName: "Akshay",
      lastName: "Panicker",
      email: "akshay@example.com", // same email as above
      password: "StrongPassword123",
    };

    const res = await request(app).post("/auth/signup").send(payload);

    expect(res.statusCode).toEqual(409); // or your custom error code
    expect(res.body).toHaveProperty(
      "message",
      "This email is akshay@example.com already registered try another email"
    );
    expect(res.body.success).toEqual(false);
  });
});

describe("Auth: User Login", async () => {
  it("user should login and return a token", async () => {
    const payload = {
      email: "akshay@example.com",
      password: "StrongPassword123",
    };
    const res = await request(app).post("/auth/login").send(payload);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Account login successfully");
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");
    expect(res.body.success).toEqual(true);
  });
  it("should fail to login with wrong password", async () => {
    const payload = {
      email: "akshay@example.com",
      password: "WrongPassword123", // wrong password
    };

    const res = await request(app).post("/auth/login").send(payload);

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message", "Invalid credential");
    expect(res.body.success).toEqual(false);
  });

  it("should fail to login with non-existing email", async () => {
    const payload = {
      email: "notfound@example.com",
      password: "Whatever123",
    };

    const res = await request(app).post("/auth/login").send(payload);

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message", "Invalid credential");
    expect(res.body.success).toEqual(false);
  });
});
