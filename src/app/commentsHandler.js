const commentsHandler = (req, res) => {
  const guestBook = req['guest-book'];
  res.json(guestBook.comments);
};

module.exports = { commentsHandler };
