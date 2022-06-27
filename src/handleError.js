const handleError = ({ uri }, response) => {
  response.statusCode = 404;
  response.send(`${uri} PATH NOT FOUND`);
  return true;
};

module.exports = { handleError };
