const { createServer } = require('http');
const { URL } = require('url');

let reqCount = 0;
const startServer = (port, router) => {
  const server = createServer((request, response) => {
    const { method, url } = request;
    const host = request.headers.host;
    
    request.url = new URL(`http://${host}${url}`);
    console.log(method, request.url.pathname, ++reqCount);
    
    if (method === 'POST') {
      let data = ''
      request.on('data', (chunk) => data += chunk);
      request.on('end', () => {
        request.bodyParams = new URLSearchParams(data);
        router(request, response);
      });
      return;
    }
    
    router(request, response);
  });
  
  const onStart =
    () => console.log(`started server on port ${server.address().port}`);
  server.listen(port, onStart);
};

module.exports = { startServer };
