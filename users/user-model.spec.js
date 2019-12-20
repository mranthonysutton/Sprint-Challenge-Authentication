const db = require("../database/dbConfig");

const { addUser, findUserBy } = require("./users-model");

describe("Users Model", function() {
  // Does not need the beforeEach because this set of functions requires that information is in the DB and the beforeEach will clear it
  describe("Find User", function() {
    it("should find the user by their username", async () => {
      const user = await findUserBy({ username: "bill" }).first();
      expect(user.username).toBe("bill");
    });

    it("should return propery properties of a user", async () => {
      const user = await findUserBy({ username: "bill" }).first();
      expect(user).toHaveProperty("id", 1);
      expect(user).toHaveProperty("username", "bill");
    });
  });
});
