const fs = require('fs');
const assert = require('assert');
const request = require('supertest');
const { createRouter } = require('../src/app.js');

describe('loginPageHandler', () => {
  it('should deny entry when entered without cookie', (done) => {
    
    request(createRouter('public', {}))
      .get('/')
      .expect(401)
      .expect('Entry Denied!!!', done)
  });
  
  it('should return a loginPage', (done) => {
    const page = fs.readFileSync('public/loginPage.html', 'utf-8');
    
    request(createRouter('./data', {}))
      .get('/login')
      .expect('content-type', /html/)
      .expect(200)
      .expect(page)
      .end(done)
  });

  it('should show already logged in page', (done) => {
    request(createRouter('public', {
      123: { username: 'Suresh', sessionId: '123', time: 'time' }
    }))
      .get('/login')
      .set("Cookie", "sessionId=123")
      .expect(200)
      .expect('You are already logged in !', done)
  });

  it('should add cookie, createSession when login post request is sent',
    (done) => {
    const sessions = {};
    request(createRouter('public', sessions))
      .post('/login')
      .send('name=Suresh')
      .expect(200)
      .expect('set-cookie', /sessionId/)
      .expect('Suresh is logged in !!!')
      .end((err) => {
        const { username } = sessions[Object.keys(sessions)[0]];
        assert.equal(username, 'Suresh');
        done(err)
      });
  });

  it('should redirect / to flower catalogue page after login', (done) => {
    request(createRouter('public', {
      123: { username: 'Suresh', sessionId: '123', time: 'time' }
    }))
      .get('/')
      .set("Cookie", "sessionId=123")
      .expect(302)
      .expect('Location', '/flower-catalog.html')
      .end(done)
  });

  it('should show flower catalogue page after login', (done) => {
    const page = fs.readFileSync('public/flower-catalog.html', 'utf-8');

    request(createRouter('public', {
      123: { username: 'Suresh', sessionId: '123', time: 'time' }
    }))
      .get('/flower-catalog.html')
      .set("Cookie", "sessionId=123")
      .expect(200)
      .expect(page, done)
  });
});
