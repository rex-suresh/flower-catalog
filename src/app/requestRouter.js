const { GuestBook } = require('./guestBook.js');
const { guestBookPage } = require('./generateGuestPage.js');
const { addComment } = require('./addComment.js');
const { commentsHandler } = require('./commentsHandler.js');

const catalogPageHandler = (request, response) => {
  response.statusCode = 302;
  response.setHeader('Location', '/flower-catalog.html');
  response.end();
  return true;
};

const handleGuestPageRequest =
  (template, commentsFile, readFile, writeFile) => {
    const guestBook =
      new GuestBook(template, commentsFile, readFile, writeFile);
    guestBook.load();

    return (request, response, next) => {
      const path = request.url.pathname;
      const method = request.method;

      if (path === '/' && method === 'GET') {
        catalogPageHandler(request, response, next);
        return;
      }
      if (path === '/guest-book' && method === 'GET') {
        request['guest-book'] = guestBook;
        guestBookPage(request, response, next);
        return;
      }
      if (path === '/add-comment' && method === 'POST') {
        request['guest-book'] = guestBook;
        addComment(request, response, next);
        return;
      }
      if (path === '/comments' && method === 'GET') {
        request['guest-book'] = guestBook;
        commentsHandler(request, response, next);
        return;
      }
      
      next(request, response, next);
    };
  };

module.exports = { handleGuestPageRequest };
