const config = require('./.serverConfig.json');
const express = require('express');

const { reqLog } = require('./app/reqLog.js');
const { injectCookies } = require('./app/injectCookies.js');
const { logOutHandler } = require('./app/logoutHandler.js');
const { attachSession, addCookie } = require('./app/loginHandler.js');
const { checkCredentials, serveLoginPage } = require('./app/loginHandler.js');
const { getGuestBook, guestBookRoutes } = require('./app/guestBookHandler.js');

const createRouter = (path, sessions, log) => {
  const app = express();
  const guestBook = getGuestBook(config.template, config.data);
  const guestBookRouter = guestBookRoutes(guestBook, express.Router());
  
  if (log) {
    app.use(reqLog);
  }

  app.use(express.urlencoded({ extended: true }));
  app.use(injectCookies);
  
  app.get('/login', serveLoginPage(sessions));
  app.post('/login', addCookie(sessions));
  app.use(attachSession(sessions));
  app.use(checkCredentials(sessions));
  app.get('/logout', logOutHandler(sessions));
  app.use('/guest-book', guestBookRouter);
  app.use(express.static(path));
  
  return app;
}

module.exports = { createRouter };
