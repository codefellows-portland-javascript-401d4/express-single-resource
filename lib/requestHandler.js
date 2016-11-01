const fileSystem = require('./fileSystem');
const handle = {};

handle.get = function(fileName) {
  return fileSystem.read(fileName)
  .then((data) => {
    return JSON.parse(data);
  });
};

handle.getAll = function() {
  return fileSystem.readDir()
  .then((data) => {
    return data.map(fileName => {
      let file = fileName.replace('.json', '');
      return fileSystem.read(file);
    });
  })
  .then(promises => Promise.all(promises))
  .then(data => data.map(note => JSON.parse(note)))
  .then(data => data.map(obj => `${obj.title} : ${obj.body}`))
  .then(data => {
    let list = '';
    data.forEach(str => {
      list += `${str} \n`;
    });
    return list;
  });
};

handle.post = function(note) {
  console.log('parsed message', note);
  return fileSystem.create(note.title, JSON.stringify(note))
   .then(() => note);
};

handle.put = function(request) {
  console.log('parsed message', request.body);
  console.log('file to update', request.params.title);
  return fileSystem.create(request.params.title, JSON.stringify(request.body))
    .then(() => request.body);
};

handle.delete = function(fileName) {
  return fileSystem.destroy(fileName);
};

module.exports = handle;
