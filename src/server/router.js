const routeRequest = (handlers) => (request, response) => {
  for (const handler of handlers) {
    if (handler(request, response)) {
      return true;
    }
  }
  return false;
};

module.exports = { routeRequest };
