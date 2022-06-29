const fs = require('fs');
const { GuestBook } = require('./guestBook.js');
const { handleMethod } = require('./handleMethod.js');
const { guestBookPage, addComment } = require('./generateGuestPage.js');

const catalogPageHandler = (request, response) => {
  response.statusCode = 301;
  response.setHeader('Location', '/flower-catalog.html');
  response.end();
  return true;
};

const attachGuestBook = (handler, guestBook) => (request, response) => {
  request['guest-book'] = guestBook;
  return handler(request, response);
};

const handleGuestPageRequest = (
  template,
  commentsFile,
  readFile,
  writeFile) => {

  const guestBook = new GuestBook(template, commentsFile, readFile, writeFile);
  guestBook.load();
  
  const handlers = [
    handleMethod('/', { 'GET': catalogPageHandler }),
    handleMethod('/guest-book',
      { 'GET': attachGuestBook(guestBookPage, guestBook) }),
    handleMethod('/add-comment',
      { 'GET': attachGuestBook(addComment, guestBook) }),
  ];
    
  return (request, response) => {
  for (const handler of handlers) {
    if (handler(request, response)) {
      return true;
    }
  };
  return false;
}};

module.exports = { handleGuestPageRequest };
