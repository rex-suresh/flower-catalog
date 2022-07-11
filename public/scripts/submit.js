const submitComment = () => {
  const formElement = document.querySelector('form');
  const formData = new FormData(formElement);
  const queryParams = new URLSearchParams(formData).toString();
  formElement.reset();
  xhr(loadComments, 'POST', '/add-comment', queryParams);
};