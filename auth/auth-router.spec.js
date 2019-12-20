const request = require("supertest");
const db = require("../database/dbConfig.js");
const server = require("../api/server.js");

describe("auth-router", function() {
  describe("POST /register", function() {
    beforeEach(async function() {
      await db("users").truncate();
    });
    it("should return JSON formated response", async function() {
      const yesJson = await request(server)
        .post("/api/auth/register")
        .send({ username: "will", password: "pass" });
      expect(yesJson.type).toMatch(/json/i);
    });
    it("should add a user to the database", async function() {
      const newUser = await request(server)
        .post("/api/auth/register")
        .send({ username: "bill", password: "pass" });
      expect(newUser.body.username).toBe("bill");
    });
  });
  describe("post /login", function() {
    it("should return a message", async function() {
      const response = await request(server)
        .post("/api/auth/login")
        .send({ username: "bill", password: "pass" });
      expect(response.body.message).toMatch("Welcome bill!");
    });
    it("should return a token", async function() {
      const response = await request(server)
        .post("/api/auth/login")
        .send({ username: "bill", password: "pass" });
      expect(response.body.token).toBeDefined();
    });
  });
});
