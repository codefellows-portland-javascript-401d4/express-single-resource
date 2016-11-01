const readBody = require('./readBody');
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

// handle.post = function(request, response) {
//   console.log('header', request.headers);
//   readBody(request, (err, note) => {
//     if(err) {
//       response.statusCode = 400;
//       response.send(err.message);
//     } else {
//       response.statusCode = 200;
//       fileSystem.create(note.title, JSON.stringify(note))
//         .then(() => {
//           return fileSystem.read(note.title);
//         })
//         .then((data) => {
//           let parsedNote = JSON.parse(data);
//           response.send(`${parsedNote.title} : ${parsedNote.body}`);
//         });
//     }
//   });
// };

handle.put = function(fileName, request, response) {
  readBody(request, (err, note) => {
    if(err) {
      response.statusCode = 400;
      response.send(err.message);
    } else {
      response.statusCode = 200;
      fileSystem.create(fileName, JSON.stringify(note))
        .then(() => {
          return fileSystem.read(fileName);
        })
        .then(data => {
          let parsedNote = JSON.parse(data);
          response.send(`You have updated ${fileName} to - ${parsedNote.title} : ${parsedNote.body}`);
        });
    }
  });
};

handle.delete = function(fileName, request, response) {
  return fileSystem.destroy(fileName)
    .then(() => {
      response.write(`${fileName} has been destroyed!`);
      response.end();
    });
};

// handle.get = function(fileName, request, response) {
//   console.log(fileName);
//   fileSystem.read(fileName)
//   .then((data) => {
//     let parsedNote = JSON.parse(data);
//     response.send(`${parsedNote.title} : ${parsedNote.body}`);
//   });
// };

// handle.getAll = function(request, response) {
//   fileSystem.readDir()
//   .then((data) => {
//     return data.map(fileName => {
//       let file = fileName.replace('.json', '');
//       return fileSystem.read(file);
//     });
//   })
//   .then(promises => Promise.all(promises))
//   .then(data => data.map(note => JSON.parse(note)))
//   .then(data => data.map(obj => `${obj.title} : ${obj.body}`))
//   .then(data => {
//     let list = '';
//     data.forEach(str => {
//       list += `${str} \n`;
//     });
//     return response.send(list);
//   });
// };


module.exports = handle;
