const config = require('./.serverConfig.json');
const express = require('express');

// const { notFoundHandler } = require('./app/notFoundHandler.js');
const { reqLog } = require('./app/reqLog.js');
const { injectCookies } = require('./app/injectCookies.js');
const { logOutHandler } = require('./app/logoutHandler.js');
const { attachSession, addSession } = require('./app/loginHandler.js');
const { checkCredentials, serveLoginPage } = require('./app/loginHandler.js');
const { getGuestBook, serveGuestBook } = require('./app/guestBookHandler.js');
const { addCommentToGuestBook, comments }
  = require('./app/guestBookHandler.js');

const createRouter = (path, sessions, log) => {
  const app = express();
  const guestBook = getGuestBook(config.template, config.data);
  
  if (log) {
    console.log(log);
    app.use(reqLog);
  }

  app.use(express.urlencoded({ extended: true }));
  app.use(injectCookies);

  app.get('/login', serveLoginPage(sessions));
  app.post('/login', addSession(sessions));
  app.use(attachSession(sessions));
  app.use(checkCredentials(sessions));
  app.get('/logout', logOutHandler(sessions));
  
  app.get('/guest-book', serveGuestBook(guestBook));  
  app.post('/add-comment', addCommentToGuestBook(guestBook));
  app.get('/comments', comments(guestBook));  
  app.use(express.static(path));
  
  return app;
}

module.exports = { createRouter };
