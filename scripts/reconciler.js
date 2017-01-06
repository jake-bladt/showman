var fs = require('fs');
var path = require('path');
var subject = require('api/models/subject'); // really need to move this functionality into a utility class

var imageLibraryReaderFactory = {
  getReader: (type, source) => {
    let ret = { source };

    if('fs' === type) {
      ret.getSubjects = () => {
        let subjects = {};
        let subjectFolders = fs.readdirSync(source);
        subjectFolders.forEach((f) => {
          let sfPath = path.join(source, f);
          let sfImages = fs.readdirSync(sfPath);
          subjects[f] = { 
            imageCount: sfImages.length,
            name: f,
            displayName:  
          };
        });

        return {
          subjects: subjects, 
          debugInfo: { subjectFolders }
        };
      }
    } else { 
      throw 'unrecognized reader type: ' + type 
    }

    return ret;
  }
};

module.exports = { imageLibraryReaderFactory };
