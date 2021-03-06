const insertCommentsToPage = (guestBook) => {
  const pageRaw = guestBook.pageRaw;
  const commentsPlaceHolder = '_DATE_TIME_NAME_COMMENTS_LIST_';
  return pageRaw.replace(commentsPlaceHolder, guestBook.toString());
};

const guestBookPage = (request, response) => {
  const guestBook = request['guest-book'];
  const page = insertCommentsToPage(guestBook);  
  response.setHeader('content-type', 'text/html')
  response.send(page);
};

const getParams = (searchParams) => {
  const params = {};
  for (const entry of searchParams.entries()) {
    const [name, value] = entry;
    params[name] = value;
  }
  return params;
};

const attachGuestBook = (handler, guestBook) => (request, response) => {
  request['guest-book'] = guestBook;
  return handler(request, response);
};

module.exports = { guestBookPage, attachGuestBook, getParams };
