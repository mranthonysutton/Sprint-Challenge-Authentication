const request = require('supertest');
const db = require('../database/dbConfig');
const server = require('../api/server');

describe('auth-router', function() {
  describe('POST /REGISTER', function() {
    beforeEach(async function() {
      await db('users').truncate();
    });

    it('should return a json', async function() {
      const response = await request(server)
        .post('/api/auth/register')
        .send({username: 'anthony', password: 'password'});

      expect(response.type).toMatch(/json/i);
    });

    it('Adds user to the DB', async function() {
      const response = await request(server)
        .post('/api/auth/register')
        .send({username: 'bacon', password: 'password'});

      expect(response.body.username).toBe('bacon');
    });
  });

  describe('POST /LOGIN', function() {
    it('should return a message', async function() {
      const response = await request(server)
        .post('/api/auth/login')
        .send({username: 'bacon', password: 'password'});
      expect(response.body.message).toMatch('Welcome bacon!');
    });
    it('should return a token', async function() {
      const response = await request(server)
        .post('/api/auth/login')
        .send({username: 'bacon', password: 'password'});
      expect(response.body.token).toBeDefined();
    });
  });
});
