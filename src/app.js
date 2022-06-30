const fs = require('fs');
const { readFileSync, writeFileSync } = fs;
const { notFoundHandler } = require('./app/notFoundHandler.js');
const { fileHandler } = require('./app/handleFiles.js');
const { handleGuestPageRequest } = require('./app/requestRouter.js');
const { routeRequest } = require('./server/router.js');


const createRouter = (path) => {
  const handlers = [
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
