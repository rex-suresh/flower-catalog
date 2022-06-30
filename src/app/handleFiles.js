const path = require('path');

const getEntries = (entryName, fs) => {
  if (fs.statSync(entryName).isFile()) {
    return entryName;
  }
  return getFiles(entryName, fs);
};

const getFiles = (dir, fs) => {
  const dirContents = fs.readdirSync(dir);
  const files = dirContents.flatMap(
    dirEntry => getEntries(`${dir}/${dirEntry}`, fs));
  return files;
};

const readFile = (file, fileCache, fs) => {
  fs.readFile(file, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    fileCache[file] = data;
  })
};

const cacheFiles = (contentDir, fs) => {
  const cache = {}
  const files = getFiles(contentDir, fs);
  files.forEach(file => readFile(file, cache, fs));
  return cache;
};

const isFile = (fileName, fs) =>
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

const fileHandler = (dirPath, fs) => {
  const fileCache = cacheFiles(dirPath, fs);
  
  return (request, response) => {
    const fileName = `${dirPath}${request.url.pathname}`;
    
    if (isFile(fileName, fs) && fileCache[fileName]) {
      return serveFileContents(fileName, fileCache[fileName], response);
    }
    return false;
  }
};

module.exports = { fileHandler };
