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

const injectGuestBook = (guestBook) => (req, res, next) => {
  req['guest-book'] = guestBook;
  next();
};

const guestBookRoutes = (guestBook, guestBookRouter) => {
  guestBookRouter.use(injectGuestBook(guestBook));
  guestBookRouter.get('/', guestBookPage);
  guestBookRouter.post('/add-comment', addComment);
  guestBookRouter.get('/comments', commentsHandler);

  return guestBookRouter
};

module.exports = { injectGuestBook, getGuestBook, guestBookRoutes };
