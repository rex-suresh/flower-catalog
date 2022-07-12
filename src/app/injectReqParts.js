const { URL } = require('url');

const injectReqParts = (request, response, next) => {
  const { method, url } = request;
  const host = request.headers.host;
  request.url = new URL(`http://${host}${url}`);
  
  if (method === 'POST') {
    let data = '';
    const dataBuffer = [];

    request.on('data', (chunk) => {
      data += chunk;
      dataBuffer.push(chunk);
    });
    
    request.on('end', () => {
      request.bodyParams = new URLSearchParams(data);
      request.body = Buffer.concat(dataBuffer);
      next();
    });
    return;
  }
  next();
};

module.exports = { injectReqParts };
