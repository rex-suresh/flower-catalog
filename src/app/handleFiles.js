const fs = require('fs');
const path = require('path');

const getEntries = (entryName) => {
  if (fs.statSync(entryName).isFile()) {
    return entryName;
  }
  return getFiles(entryName);
};

const getFiles = (dir) => {
  const dirContents = fs.readdirSync(dir);
  const files = dirContents.flatMap(
    dirEntry => getEntries(`${dir}/${dirEntry}`));
  return files;
};

const readFile = (file, fileCache) => {
  fs.readFile(file, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    fileCache[file] = data;
  })
};

const cacheFiles = (contentDir) => {
  const cache = {}
  const files = getFiles(contentDir);
  files.forEach(file => readFile(file, cache));
  return cache;
};

const isFile = (fileName) =>
  fs.existsSync(fileName) && fs.statSync(fileName).isFile();

const getContentType = (ext) => {
  const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.pdf': 'application/pdf',
  };
  return contentTypes[ext] || 'text/plain';
};

const serveFileContents = (fileName, body, response) => {
  const fileExt = path.parse(fileName).ext;
  const contentType = getContentType(fileExt);
  
  response.setHeader('Content-type', contentType);
  response.end(body);
  return true;
};

const handleFileRequest = (dirPath) => {
  const fileCache = cacheFiles(dirPath);
  
  return (request, response) => {
    const fileName = `${dirPath}${request.url.pathname}`;
    
    if (isFile(fileName) && fileCache[fileName]) {
      return serveFileContents(fileName, fileCache[fileName], response);
    }
    return false;
  }
};

module.exports = { handleFileRequest };
