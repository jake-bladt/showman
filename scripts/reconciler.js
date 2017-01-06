var fs = require('fs');
var path = require('path');
var subject = require('../api/src/models/subject'); // need to move this into util

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
            displayName:  subject.displayNameFromName(f)
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

var yearbookReaderFactory = {
  getReader: (type, source) => {
    let ret = { source };
    let subjectImages = fs.readdirSync(source);
    
  }
};

module.exports = { imageLibraryReaderFactory, yearbookReaderFactory };
