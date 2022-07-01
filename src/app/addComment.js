const { getParams } = require("./generateGuestPage");

const addComment = (request, response) => {
  const guestBook = request['guest-book'];
  const params = getParams(request.bodyParams);

  if (params['name'] && params['message']) {
    guestBook.addComment(params);
    guestBook.save();
  }

  response.statusCode = 302;
  response.setHeader('Location', '/guest-book');
  response.end();
  return true;
};

module.exports = { addComment };
