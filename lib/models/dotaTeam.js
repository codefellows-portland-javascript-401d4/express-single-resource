const sander = require('sander');
const bodyReader = require('../bodyReader');

const fileStore = {};

fileStore.path = './lib/dotaTeams';

fileStore.teamToJson = teamObj => JSON.stringify(teamObj);

fileStore.readDir = dir => {
    console.log('readDir called for', dir);
    return sander.readdir(dir);
}; 

fileStore.getOne = (teamId) => {
    console.log('getting team: ', teamId);
    return sander.readFile(fileStore.path + '/' + teamId, {encoding: 'utf-8'});
};

fileStore.getAll = () => {
    console.log('getting all teams');
    return fileStore.readDir(fileStore.path)
            .then(idArray => {
                let allTeams = idArray.map( (id) => {
                        return fileStore.getOne(id);
                        });
                return Promise.all(allTeams);
            });
};

fileStore.add = teamObj => {
    console.log('adding team:', teamObj);
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
          let teamJSON = fileStore.teamToJson(teamObj);
          return sander.writeFile(fileStore.path, fileName, teamJSON);
      })
      .catch(err => {
          return (err);
      });
};


fileStore.updateFile = (id, teamObj) => {
    // teamObj.id = id;
    let teamJSON = fileStore.teamToJson(teamObj);
    return sander.writeFile(fileStore.path, id, teamJSON);
};

fileStore.remove = teamName => {
    console.log('delete time!>>', teamName);
    return sander.unlink(fileStore.path + '/' + teamName);
};

module.exports = fileStore; 

