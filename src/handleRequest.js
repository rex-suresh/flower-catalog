const fs = require('fs');
const { handleFileRequest } = require('./handleFiles.js');
const { Comments } = require('./comment.js');
const commentsFile = 'public/.comments.json';
const comments = new Comments(JSON.parse(fs.readFileSync(commentsFile, 'utf8')));

const catalogPageHandler = (request, response, path) => {
  const pagePath = '/flower-catalog.html';
  return handleFileRequest({ uri: pagePath }, response, path);
};

const writeToFile = (comments) => {
  const stringComments = JSON.stringify(comments);
  fs.writeFileSync(commentsFile, stringComments, 'utf8');
};

const generateGuestBookPage = (request, response, path) => {
  const pageRaw = fs.readFileSync(`${path}/guest-book.html`, 'utf8');
  const page = pageRaw.replace(
    '_DATE_TIME_NAME_COMMENTS_LIST_', comments.toString());
  response.send(page);
  comments.visit(writeToFile);
  return true;
};

const getGuestComment = (request, response, path) => {
  const { name, message } = request.queryParams;
  comments.addComment(name, message);
  return generateGuestBookPage(request, response, path);
};

const guestBookPageHandler = (request, response, path) => {
  if (request.queryParams.name && request.queryParams.message) {
    return getGuestComment(request, response, path);
  }
  return generateGuestBookPage(request, response, path);
};

const handleRequest = (request, response, path) => {
  const { uri } = request;

  if (uri === '/') {
    return catalogPageHandler(request, response, path);
  }
  if (uri === '/guest-book') {
    return guestBookPageHandler(request, response, path);
  }
  return false;
};

module.exports = { handleRequest };
