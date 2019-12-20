const db = require('../database/dbConfig');

module.exports = {
  allUsers,
  addUser,
  findUserBy,
};

function allUsers() {
  return db('users');
}

function addUser(userData) {
  return db('users')
    .insert(userData, 'id')
    .then(ids => {
      const [id] = ids;

      return findUserBy({id});
    });
}

function findUserBy(filter) {
  return db('users')
    .where(filter)
    .first();
}
