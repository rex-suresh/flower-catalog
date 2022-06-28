const { createServer } = require('http');
const { URL } = require('url');

const startServer = (port, router) => {
  const server = createServer((request, response) => {
    const { method, url } = request;
    const host = request.headers.host;
    request.url = new URL(`http://${host}${url}`);
    console.log(method, request.url.pathname);
    
    router(request, response);
  });
  
  const onStart =
    () => console.log(`started server on port ${server.address().port}`);
  server.listen(port, onStart);
};

module.exports = { startServer };