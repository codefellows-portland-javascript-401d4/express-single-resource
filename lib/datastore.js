const sander = require('sander');


function write( basedir, filename, data ) {
  return sander.writeFile( basedir, filename, data )
    .catch( err => {
      console.error('Error in write: ', err);
      throw { code: 400, error: 'File write error, please try again.' };
    });
}

function getAll( dirname ) {
  return sander.readdir( dirname )
    .then( function( results ){
      let message = '<h2>The data store contains the following files: </h2><ul>\n\n';
      results.map(function(cur) {
        message += `<li>${cur}</li>`;
      });
      message += '</ul>';
      message += 'To retrieve a file, please query the file name';

      return message;
    })
    .catch( err => {
      console.error('Error in getAll: ', err);
      throw { code: 400, error: `File error, please check directory ${dirname} and try again.` };
    });
}

function getOne( pathname, filename ) {
  return sander.readFile( pathname, filename )
    .catch( err => {
      console.error('Error in getOne: ', err);
      if ( err.code === 'ENOENT' ) {
        throw { code: 404, error: `File ${filename} does not exist` };
      } else {
        throw { code: 400, error: 'File error, please check filename and try again.' };
      }
    });
}

function deleteOne( filepath ) {
  return sander.unlink( filepath )
    .catch( err => {
      console.error('Error in deleteOne: ', err);
      throw { code: 404, error: `File ${filepath} does not exist` };
    });
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