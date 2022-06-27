const { createServer } = require('net');
const { handleError } = require('./src/handleError.js');
const { handleRequest } = require('./src/handleRequest.js');
const { handleFileRequest, cacheFiles } = require('./src/handleFiles.js');
const { parseRequest } = require('./src/parseRequest.js');
const { Response } = require('./src/response.js');

const onRequest = (socket, handle, contentDir) => {
  socket.on('data', (clientRequest) => {
    const request = parseRequest(clientRequest.toString());
    console.log(request.method, request.uri);
    const response = new Response(socket);
    handle(request, response, contentDir);
  });
  socket.on('error', (error) => console.error(error));
};

const handle = (handlers) => {
  return (request, response, contentDir) => {
    for (const handler of handlers) {
      if (handler(request, response, contentDir)) {
        return true;
      }
    }
  };
};

const onStart = () => console.log(`started server on port ${PORT}`);

const startServer = (port, handler, contentDir = 'public') => {
  const server = createServer(socket =>
    onRequest(socket, handler, contentDir));
  cacheFiles(contentDir);
  server.listen(port, onStart);
};

const PORT = 80;
const handlers = [handleRequest, handleFileRequest, handleError];
startServer(PORT, handle(handlers), process.argv[2]);

module.exports = { onRequest };
