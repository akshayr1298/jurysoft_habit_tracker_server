// user.test.ts
import request from "supertest";
import app from "../app";
import { connectTestDB, disconnectTestDB, clearTestDB } from "./setupTestDB";
import { it, describe, expect, beforeAll, afterAll,afterEach } from "vitest";

let accessToken: string;

beforeAll(async () => {
  await connectTestDB();

  // register test user
  const res = await request(app).post("/auth/signup").send({
    firstName: "Test",
    lastName: "User",
    email: "testuser@example.com",
    password: "TestPassword123",
  });

  accessToken = res.body.accessToken;
});

afterAll(async () => {
  await disconnectTestDB();
});

afterEach(async () => {
  await clearTestDB(); // optional if you want fresh DB between test cases
});

describe("User: Profile", () => {
  it("should fetch profile successfully", async () => {
    const res = await request(app)
      .get("/profile")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
