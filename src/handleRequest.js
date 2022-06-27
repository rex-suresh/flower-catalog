const fs = require('fs');
const { handleFileRequest } = require('./handleFiles.js');

const catalogPageHandler = (request, response, path) => {
  const pagePath = '/flower-catalog.html';
  return handleFileRequest({ uri: pagePath }, response, path);
};

const guestBookPageHandler = (request, response, path) => {
  if (request.queryParams.name && request.queryParams.comment) {
    return getGuestComment(request, response, path);
  }
  return generateGuestBookPage(request, response, path);
};

const handleRequest = (request, response, path) => {
  const { uri } = request;

  if (uri === '/') {
    return catalogPageHandler(request, response, path);
  }
  if (uri === 'guest-book') {
    return guestBookPageHandler(request, response, path);
  }
  return false;
};

module.exports = { handleRequest };
