const db = require('../database/dbConfig');
const Users = require('./users-model');

describe('Users Model', function() {
  describe('Register User', function() {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it('Creates a new user', async () => {
      await Users.addUser({username: 'anthony', password: 'password'});

      const users = await db('users');
      expect(users).toHaveLength(1);
    });

    it('Returns the users username', async () => {
      await Users.addUser({username: 'anthony', password: 'password'});

      const users = await db('users');
      expect(users[0].username).toBe('anthony');
    });
  });

  // Does not need the beforeEach because this set of functions requires that information is in the DB and the beforeEach will clear it
  describe('Find User', function() {
    it('should find the user by their username', async () => {
      const user = await Users.findUserBy({username: 'anthony'}).first();
      expect(user.username).toBe('anthony');
    });

    it('should return propery properties of a user', async () => {
      const user = await Users.findUserBy({username: 'anthony'}).first();
      expect(user).toHaveProperty('id', 1);
      expect(user).toHaveProperty('username', 'anthony');
      expect(user).toHaveProperty('password', 'password');
    });
  });
});
