const request = require("supertest");

const server = require("../api/server.js");

describe("jokes-router", function() {
  describe("GET /api/jokes", function() {
    it("should return json", async () => {
      const response = await request(server).get("/api/jokes");
      expect(response.type).toMatch(/json/i);
    });
    it("should return 401 without a header or token", async () => {
      const response = await request(server).get("/api/jokes");
      expect(response.status).toBe(401);
    });
  });
});
