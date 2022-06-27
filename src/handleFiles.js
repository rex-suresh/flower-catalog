const fs = require('fs');

const fileCache = {};

const getEntries = (entryName) => {
  if (fs.statSync(entryName).isFile()) {
    return entryName;
  }
  return getFiles(entryName);
};

const getFiles = (dir) => {
  const readdir = (dir) => fs.readdirSync(dir);
  const dirContents = readdir(dir);
  
  const files = dirContents.flatMap(dirEntry => {
    return getEntries(`${dir}/${dirEntry}`);
  });

  return files;
};

const readFile = (file) => {
  fs.readFile(file, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    fileCache[file] = data;
  })
};

const cacheFiles = (contentDir) => {
  const files = getFiles(contentDir);
  files.forEach( file => readFile(file));
};

const handleFileRequest = (request, response, path) => {
  const { uri } = request;
  const fileName = `${path}${uri}`
  const isFile = (fileName) =>
  fs.existsSync(fileName) && fs.statSync(fileName).isFile();
  
  if (isFile(fileName)) {
    const body = fileCache[fileName];
    response.send(body);
    return true;
  }
  return false;
};

module.exports = { handleFileRequest, cacheFiles };
