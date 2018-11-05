const sander = require('sander');

//methods on dataStore correspond to CRUD operations
const dataStore = {};

//any errors thrown in a callback jump to the catch
//returning sander is the same thing as returning promise
dataStore.retrieveDir = (filePath) => {
  return sander.readdir(filePath);
};

dataStore.retrieveFile = (id) => {
  let relPath = `./notes/${id}.json`;
  return sander.readFile(relPath);
};

dataStore.stash = (id, body) => {
  let relPath = `./notes/${id}.json`;
  return sander.writeFile(relPath, body);
};

dataStore.update = (id, body) => {
  let relPath = `./notes/${id}.json`;
  return sander.writeFile(relPath, body);
};

dataStore.remove = (id) => {
  let relPath = `./notes/${id}.json`;
  return sander.unlink(relPath);
};

module.exports = dataStore;