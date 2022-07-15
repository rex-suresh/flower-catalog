const commentsHandler = (req, res, next) => {
  const guestBook = req['guest-book'];
  res.json(guestBook.comments);
};

module.exports = { commentsHandler };
