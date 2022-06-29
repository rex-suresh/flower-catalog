const insertCommentsToPage = (guestBook) => {
  const pageRaw = guestBook.pageRaw;
  const commentsPlaceHolder = '_DATE_TIME_NAME_COMMENTS_LIST_';
  return pageRaw.replace(commentsPlaceHolder, guestBook.toString());
};

const guestBookPage = (request, response) => {
  const guestBook = request['guest-book'];
  const page = insertCommentsToPage(guestBook);  
  response.end(page);
  return true;
};

const getParams = (searchParams) => {
  const params = {};
  for (const entry of searchParams.entries()) {
    const [name, value] = entry;
    params[name] = value;
  }
  return params;
};

const addComment = (request, response) => {
  const guestBook = request['guest-book'];
  const params = getParams(request.url.searchParams);
  
  if (params['name'] && params['message']) {
    guestBook.addComment(params);
    guestBook.save();
  }

  response.statusCode = 302;
  response.setHeader('Location', '/guest-book');
  response.end();
  return true;
};

module.exports = { guestBookPage, addComment };
