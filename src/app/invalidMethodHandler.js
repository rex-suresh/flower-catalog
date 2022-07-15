const invalidMethodHandler = (request, response) => {
  response.statusCode = 405;
  response.send(`Invalid method on ${request.url.pathname}`);
  return true;
};

module.exports = { invalidMethodHandler };
