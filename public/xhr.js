const xhr = (xhrHandler, method, path, bodyParams) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = (event) => xhrHandler(xhr, event);
  xhr.open(method, path);
  if (method === 'POST') {
    xhr.send(bodyParams);
    return;
  }
  xhr.send();
};
