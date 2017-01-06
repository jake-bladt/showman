var fs = require('fs');

var imageLibraryReaderFactory = {
  getReader: (type, source) => {
    let subjects = {};
    let ret = { source, subjects };

    if('fs' === type) {
      ret.getSubjects = () => {
        let allFilesAndFolders = fs.readdirSync(source);
        ret.debugInfo = allFilesAndFolders;
      }
    } else { 
      throw 'unrecognized reader type: ' + type 
    }

    return ret;
  }
};

module.exports = { imageLibraryReaderFactory };
