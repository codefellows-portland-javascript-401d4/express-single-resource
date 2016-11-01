const sander = require('sander');
const path = require('path');

function getFileList() {
    let pathname = path.join(__dirname, '/cities/');
    return sander.readdir(pathname);
}

function getOneFile(id) {
    let pathname = path.join(__dirname, '/cities/');
    id = id += '.txt';
    return sander.readFile(pathname + id);
}

function createFile(filename, data) {
    let pathname = path.join(__dirname, '/cities/');
    filename = filename += '.txt';
    return sander.writeFile(pathname, filename, data);
}

function replaceFile(filename, data) {
    let pathname = path.join(__dirname, '/cities/');
    filename = filename += '.txt';
    data = data += ' second copy';
    return sander.writeFile(pathname, filename, data);
}

function deleteFile(id) {
    let pathname = path.join(__dirname, '/cities/');
    id = id += '.txt';
    return sander.unlink(pathname + id);
}

module.exports = {getFileList, getOneFile, createFile, replaceFile, deleteFile};