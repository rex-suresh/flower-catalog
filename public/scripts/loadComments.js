const createElm = (tag) => document.createElement(tag);

const addCommentRow = (comment, commentRow) => {
  const { name, message, date } = comment;

  const nameEl = createElm('td');
  nameEl.innerText = name;
  commentRow.appendChild(nameEl);

  const messageEl = createElm('td');
  messageEl.innerText = message;
  commentRow.appendChild(messageEl);

  const dateEl = createElm('td');
  dateEl.innerText = date;
  commentRow.appendChild(dateEl);
};

const commentsHeaderRow = () => {
  const header = document.createElement('tr');

  const date = createElm('th');
  date.innerText = 'DATE, TIME';
  header.appendChild(date);

  const name = createElm('th');
  name.innerText = 'NAME';
  header.appendChild(name);

  const comment = createElm('th');
  comment.innerText = 'COMMENT';
  header.appendChild(comment);

  return header;
};

const loadComments = (xhr, event) => {
  const comments = JSON.parse(xhr.response);
  console.log(comments);
  const commentsBlock = document.querySelector('#comments-table');
  commentsBlock.innerHTML = '';
  
  comments.forEach(comment => {
    const commentRow = createElm('tr');
    commentsBlock.appendChild(commentRow);
    addCommentRow(comment, commentRow);
  });
};

