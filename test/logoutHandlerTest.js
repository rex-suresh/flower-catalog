const assert = require('assert');
const request = require('supertest');
const { createRouter } = require('../src/app.js');

describe('loginPageHandler', () => {
  it('should deny when tried to enter without cookie', (done) => {
    request(createRouter('public', {}, false))
      .get('/logout')
      .expect(401)
      .expect('Entry Denied!!!', done)
    });
    
  it('should deny when tried to enter without cookie', (done) => {
    const sessions = {
      123: { username: 'Suresh', sessionId: '123', time: 'time' }
    };

    request(createRouter('public', sessions, false))
      .get('/logout')
      .set("Cookie", "sessionId=123")
      .expect(200)
      .expect('Suresh Logged out successfully')
      .end((err) => {
        assert.ok(Object.keys(sessions).length === 0);
        done(err);
    })
  });
});
