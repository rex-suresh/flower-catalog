const parseToChar = (chars) => {
  const lookup = { '%2F': '/', '+': ' ', '%0D': '\r', '%0A': '\n' };
  let parsedChars = chars;

  Object.entries(lookup).forEach(
    ([from, to]) => {parsedChars = parsedChars.replaceAll(from, to);}
  );
  return parsedChars;
};

const parseParams = (params) => {
  const queryParams = {};
  params.split('&').forEach(parameter => {
    const [label, value] = parameter.split('=');
    queryParams[label] = parseToChar(value);
  });
  return queryParams;
};

const parseUrl = (rawUrl) => {
  const [uri, params] = rawUrl.split('?');
  let queryParams = {};
  if (params) {
    queryParams = parseParams(params);
  }
  return { uri, queryParams};
};

const parseRequestLine = (requestLine) => { 
  const [method, rawUrl, protocol] = requestLine.split(' ');
  const url = parseUrl(rawUrl);
  return { method, ...url, protocol };
};

const separateHeaderFields = (headerLine) => {
  const splitIndex = headerLine.indexOf(':');
  const name = headerLine.slice(0, splitIndex).trim();
  const value = headerLine.slice(splitIndex + 1).trim();
  return [name.toLowerCase(), value];
};

const parseHeaders = (lines) => {
  const headers = {};
  let index = 0;
  while (lines[index]) {
    const [name, value] = separateHeaderFields(lines[index]);
    headers[name] = value;
    index++;
  }
  return headers;
};

const parseRequest = (request) => { 
  const [reqLine, ...lines] = request.split('\r\n');
  const requestLine = parseRequestLine(reqLine);
  const headers = parseHeaders(lines);
  return { ...requestLine, headers };
};

module.exports = {
  parseRequest, parseRequestLine, parseHeaders, separateHeaderFields
};
