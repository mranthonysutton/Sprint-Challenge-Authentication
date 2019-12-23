const request = require('supertest');
const server = require('./server');

describe('server.js', function() {
  describe('environment', function() {
    it('should set environment to testing', function() {
      expect(process.env.DB_ENV).toBe('testing');
    });

    it('should return 200 status', function() {
      return request(server)
        .get('/')
        .then(response => {
          expect(response.status).toBe(200);
        });
    });

    it("should return {api: 'Up and running...'}", function() {
      return request(server)
        .get('/')
        .then(response => {
          expect(response.body.api).toBe('Up and running...');
        });
    });
  });
});
