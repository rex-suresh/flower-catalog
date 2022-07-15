const addComment = (request, response) => {
  const guestBook = request['guest-book'];
  const params = request.body;

  if (params.message) {
    guestBook.addComment({...params, name: request.session.username});
    guestBook.save();
  }
  response.json(guestBook.comments);
};

module.exports = { addComment };
