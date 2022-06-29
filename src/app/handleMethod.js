const { invalidMethodHandler } = require('./invalidMethodHandler.js');

const handleMethod = (path, methods) => (request, response) => {
  if (path !== request.url.pathname) {
    return false;
  }

  if (!methods[request.method]) {
    return invalidMethodHandler(request, response);
  }

  const handler = methods[request.method];
  return handler(request, response);
};

module.exports = { handleMethod };
