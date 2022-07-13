const fs = require('fs');
const { readFileSync, writeFileSync } = fs;

const { notFoundHandler } = require('./app/notFoundHandler.js');
const { fileHandler } = require('./app/handleFiles.js');
const { handleGuestPageRequest } = require('./app/requestRouter.js');
const { routeRequest } = require('./server/asyncRouter.js');

const { reqLog } = require('./app/reqLog.js');
const { loginHandler } = require('./app/loginHandler.js');
const { injectCookies } = require('./app/injectCookies.js');
const { logOutHandler } = require('./app/logoutHandler.js');
const { injectReqParts } = require('./app/injectReqParts.js');

const createRouter = (path, sessions) => {
  const handlers = [
    injectReqParts,
    reqLog,
    injectCookies,
    loginHandler(sessions),
    logOutHandler(sessions),
    handleGuestPageRequest(
      './src/templates/guest-book.html',
      './data/.comments.json',
      readFileSync,
      writeFileSync),
    
    fileHandler(path, fs),
    notFoundHandler
  ];
  return routeRequest(handlers);
};

module.exports = { createRouter };
