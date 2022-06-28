const notFoundHandler = (request, response) => {
  const url = request.url.pathname;
  response.statusCode = 404;
  response.end(`${url} PATH NOT FOUND`);
  return true;
};

module.exports = { notFoundHandler };
