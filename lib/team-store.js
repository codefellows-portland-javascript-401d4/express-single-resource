const sander = require('sander');

const TeamStore = class TeamStore {
    getList(dir) {
        return sander.readdir(dir);
    }

    getFile(file) {
        return sander.readFile(file, {encoding: 'utf8'});
    }

    removeFile(file) {
        return sander.unlink(file);
    }

    openDir(dir, flags) {
        return sander.open(dir, flags);
    }

    writeFile(file, data) {
        return sander.writeFile(file, data);
    }
};

module.exports = TeamStore;