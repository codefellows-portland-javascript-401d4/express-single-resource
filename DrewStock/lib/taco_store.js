const sander = require('sander');


const TacoStore = class TacoStore {

    getList(dir) {
        return sander.readdir(dir);
    }

    getFile(file) {
        return sander.readFile(file, {encoding:'utf8'});
    }

    removeFile(file) {
        return sander.unlink(file);
    }

    openDir(dir, flags) {
        console.log(dir);
        return sander.open(dir, flags);
    }

    writeFile(file, data) {
        return sander.writeFile(file, data);
    }

};


module.exports = TacoStore;
