const { readFileSync, writeFileSync } = require('fs');
const { notFoundHandler } = require('./app/notFoundHandler.js');
const { handleFileRequest } = require('./app/handleFiles.js');
const { handleGuestPageRequest } = require('./app/handleRequest.js');
const { routeRequest } = require('./server/router.js');


const createRouter = (path) => {
  const handlers = [
    handleGuestPageRequest(
      'src/templates/guest-book.html',
      'data/.comments.json',
      readFileSync,
      writeFileSync),
    
    handleFileRequest(path),
    notFoundHandler
  ];
  return routeRequest(handlers);
};

module.exports = { createRouter };
