const sander = require('sander');
const path = require('path');

function getFileList() {
  let pathname = path.join(__dirname, '/cities/');
  return sander.readdir(pathname);
}

function getOneFile(id) {
  let pathname = path.join(__dirname, '/cities/');
  id += '.txt';
  return sander.readFile(pathname + id, { encoding: 'utf-8' });
}

function createFile(filename, data) {
  let pathname = path.join(__dirname, '/cities/');
  filename += '.txt';
  console.log(data);
  return sander.writeFile(pathname, filename, data);
}

function replaceFile(filename, data) {
  let pathname = path.join(__dirname, '/cities/');
  filename += '.txt';
  data += ' second copy';
  return sander.writeFile(pathname, filename, data);
}

function deleteFile(id) {
  let pathname = path.join(__dirname, '/cities/');
  id += '.txt';
  return sander.unlink(pathname + id);
}

module.exports = {getFileList, getOneFile, createFile, replaceFile, deleteFile};
