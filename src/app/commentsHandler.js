const commentsHandler = (req, res, next) => {
  const guestBook = req['guest-book'];
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(guestBook.comments));
};

module.exports = { commentsHandler };
