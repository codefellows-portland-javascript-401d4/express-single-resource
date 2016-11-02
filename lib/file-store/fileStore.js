const sander = require('sander');
const fileStore = {};

fileStore.path = './teams';

fileStore.createFile = teamObj => {
  return fileStore.readDir(fileStore.path)
    .then(idArr => {
      if (!idArr.length) {
        return ['0'];
      } else {
        return idArr.sort((a, b) => {
          return a - b;
        });
      }
    })
    .then(sortedArr => {
      let fileId = sortedArr.pop();
      teamObj.id = ++fileId;
      let fileName = teamObj.id.toString();
      let teamJSON = JSON.stringify(teamObj);
      return sander.writeFile(fileStore.path, fileName, teamJSON);
    })
    .catch(err => {
      console.log(err);
      return (err);
    });
};

fileStore.readDir = dir => {
  return sander.readdir(dir);
}; 

fileStore.getFile = teamName => {
  return sander.readFile(fileStore.path + '/' + teamName, {encoding: 'utf-8'});
};

fileStore.getAll = idArray => {
  return Promise.all(idArray.map(id => {
    return fileStore.getFile(id);
  }))
  .then(dataArr => {
    return dataArr;
  })
  .catch(err => {
    console.log(err);
  });  
};

fileStore.updateFile = (teamObj, id) => {
  teamObj.id = id;
  let teamJSON = JSON.stringify(teamObj);
  return sander.writeFile(fileStore.path, id, teamJSON);
};

fileStore.destroy = teamName => {
  return sander.unlink(fileStore.path + '/' + teamName);
};

module.exports = fileStore; 

