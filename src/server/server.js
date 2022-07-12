const { createServer } = require('http');

const startServer = (port, router) => {
  const server = createServer(router);
  const onStart =
    () => console.log(`started server on port ${server.address().port}`);
  server.listen(port, onStart);
};

module.exports = { startServer };
