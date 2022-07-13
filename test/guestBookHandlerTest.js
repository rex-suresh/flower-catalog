const request = require('supertest');
const { createRouter } = require('../src/app.js');

describe('GuestBook handler', () => {
  it('should serve guestBook page', (done) => {
    request(createRouter('public', {
      123: { username: 'Suresh', sessionId: '123', time: 'time' }
    }))
    .get('/guest-book')
    .set("Cookie", "sessionId=123")
    .expect(200)
    .expect('content-type', /html/)
    .end(done)
  });
});

describe('Add-comments', () => {
  it('should add Comments and send all comments as response', (done) => {
    request(createRouter('public', {
      153: { username: 'Suresh', sessionId: '153', time: 'time' }
    }))
    .post('/add-comment')
    .set("Cookie", "sessionId=153")
    .expect(200)
    .expect('content-type', /json/)
    .end(done)
  });
});

describe('Comments', () => {
  it('should send the comments as response', (done) => {
    request(createRouter('public', {
      111: { username: 'kumar', sessionId: '111', time: 'time' }
    }))
      .get('/comments')
    .set("Cookie", "sessionId=111")
    .expect(200)
    .expect('content-type', /json/)
    .end(done)
  });
});
