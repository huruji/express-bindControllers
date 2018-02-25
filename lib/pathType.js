const fs = require('fs');

module.exports = (path) => {
    const stats = fs.statSync(path);
    if(stats.isFile()) return 'file';
    if(stats.isDirectory()) return 'directory';
    return;
};