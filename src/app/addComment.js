const addComment = (req, res) => {
  const guestBook = req['guest-book'];
  const params = req.body;
  
  if (params.message) {
    guestBook.addComment({...params, name: req.session.username});
    guestBook.save();
  }
  res.json(guestBook.comments);
};

module.exports = { addComment };
