const { notFoundHandler } = require('./app/notFoundHandler.js');
const { handleFileRequest } = require('./app/handleFiles.js');
const { handleRequest } = require('./app/handleRequest.js');
const { routeRequest } = require('./server/router.js');


const createRouter = (path) => {
  const handlers = [handleFileRequest(path), handleRequest, notFoundHandler];
  return routeRequest(handlers);
};

module.exports = { createRouter };
