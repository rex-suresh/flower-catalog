const fs = require('fs');
const { GuestBook } = require('./comment.js');
const { generateGuestBookPage, addComment } = require('./generateGuestPage.js');

const comments = JSON.parse(fs.readFileSync('data/.comments.json', 'utf8'));
const guestBook = new GuestBook(comments);

const catalogPageHandler = (request, response) => {
  response.statusCode = 301;
  response.setHeader('Location', '/flower-catalog.html');
  response.end();
};

const handleRequest = (request, response) => {
  const pathName = request.url.pathname;
  
  if (pathName === '/') {
    return catalogPageHandler(request, response);
  }
  if (pathName === '/guest-book') {
    request['guest-book'] = guestBook;
    return generateGuestBookPage(request, response);
  }
  if (pathName === '/add-comment') {
    request['guest-book'] = guestBook;
    return addComment(request, response);
  }
  return false;
};

module.exports = { handleRequest };
