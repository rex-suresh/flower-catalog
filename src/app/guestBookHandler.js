const { writeFileSync, readFileSync } = require('fs');
const { GuestBook } = require('./guestBook.js');
const { addComment } = require('./addComment.js');
const { commentsHandler } = require('./commentsHandler.js');
const { guestBookPage } = require('./generateGuestPage.js');

const getGuestBook = (template, commentsFile) => {
  const guestBook = new GuestBook(template, commentsFile, readFileSync, writeFileSync);
  guestBook.load();

  return guestBook;
};

const serveGuestBook = (guestBook) => (req, res, next) => {
  req['guest-book'] = guestBook;
  guestBookPage(req, res, next);
};

const addCommentToGuestBook = (guestBook) => (req, res, next) => {
  req['guest-book'] = guestBook;
  addComment(req, res, next);
};

const comments = (guestBook) => (req, res, next) => {
  req['guest-book'] = guestBook;
  commentsHandler(req, res, next);
};

module.exports = {
  getGuestBook, comments, addCommentToGuestBook, serveGuestBook
};
