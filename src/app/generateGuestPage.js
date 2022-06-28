const fs = require('fs');

const writeToFile = (comments) => {
  const commentsFile = 'data/.comments.json';
  const commentsString = JSON.stringify(comments);
  fs.writeFileSync(commentsFile, commentsString, 'utf8');
};

const insertCommentsToPage = (pageRaw, guestBook) => {
  const commentsPlaceHolder = '_DATE_TIME_NAME_COMMENTS_LIST_';
  return pageRaw.replace(commentsPlaceHolder, guestBook.toString());
};

const generateGuestBookPage = (request, response) => {
  const pageRaw = fs.readFileSync('src/templates/guest-book.html', 'utf8');
  const guestBook = request['guest-book'];
  const page = insertCommentsToPage(pageRaw, guestBook);
  
  
  response.end(page);
  writeToFile(guestBook.comments);
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
  const params = getParams(request.url.searchParams);
  const guestBook = request['guest-book'];
  if (params['name'] && params['message']) {
    guestBook.addComment(params);
  }
  return generateGuestBookPage(request, response);
};

exports.addComment = addComment;
exports.generateGuestBookPage = generateGuestBookPage;
