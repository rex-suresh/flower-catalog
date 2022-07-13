const xhr = (xhrHandler, method, path, bodyParams) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = (event) => {
    if (xhr.status === 200) {
      xhrHandler(xhr, event)
      return;
    }
    console.log(`Unable to fetch ${path} at ${method}`);
  };
  xhr.open(method, path);
  if (method === 'POST') {
    xhr.send(bodyParams);
    return;
  }
  xhr.send();
};
