const sander = require('sander');


function write( basedir, filename, data ) {
  return sander.writeFile( basedir, filename, data );
}

function getAll( dirname ) {
  return sander.readdir( dirname )
    .then(function(results){
      let message = '<h2>The data store contains the following files: </h2><ul>\n\n';
      results.map(function(cur, i, arr) {
        message += `<li>${cur}</li>`;
      });
      message += '</ul>';
      message += 'To retrieve a file, please query the file name';

      return message;
    });
}

function getOne( pathname, filename ) {
  return sander.readFile( pathname, filename );
}

function deleteOne( filepath ) {
  return sander.unlink( filepath );
}

// function deleteAll( filename ) {
//   return sander.rimraf( pathtodir ).then(function(results) {
//     console.log(result);
//   });
// }

exports.write = write;
exports.getAll = getAll;
exports.getOne = getOne;
exports.deleteOne = deleteOne;