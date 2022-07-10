const { getParams } = require('./generateGuestPage.js');

const addComment = (request, response) => {
  const guestBook = request['guest-book'];
  const params = getParams(request.bodyParams);

  if (params.message) {
    guestBook.addComment({...params, name: request.session.username});
    guestBook.save();
  }

  response.setHeader('Content-type', 'application/json');
  response.end(JSON.stringify(guestBook.comments));
};

module.exports = { addComment };
