const createElm = (tag) => document.createElement(tag);

const addCommentRow = (comment, commentRow) => {
  const { name, message, date } = comment;
  const row = [date ,name, message];

  row.forEach((entry) => {
    const element = createElm('td');
    commentRow.appendChild(element);
    element.innerText = entry;
  });
};

const commentsHeaderRow = () => {
  const header = document.createElement('tr');
  
  const row = ['Date, Time', 'Name', 'Comment'];

  row.forEach((entry) => {
    const element = createElm('th');
    header.appendChild(element);
    element.innerText = entry;
  });

  return header;
};

const loadComments = (xhr, event) => {
  const commentsBlock = document.querySelector('#comments-table');
  const comments = JSON.parse(xhr.response);
  
  commentsBlock.innerHTML = '';
  commentsBlock.appendChild(commentsHeaderRow());
  comments.forEach(comment => {
    const commentRow = createElm('tr');
    commentsBlock.appendChild(commentRow);
    addCommentRow(comment, commentRow);
  });
};

const getComments = () => {
  xhr(loadComments, 'GET', '/comments');
};

window.onload = getComments;
