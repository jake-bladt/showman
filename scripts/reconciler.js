let fs = require('fs');
let path = require('path');
let subject = require('../api/src/models/subject'); // need to move this into util

let imageLibraryReaderFactory = {
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
      throw 'unrecognized reader type: ' + type; 
    }

    return ret;
  }
};

let yearbookReaderFactory = {
  getReader: (type, source) => {
    let ret = { source };
    if('fs' === type) {
      ret.getSubjects = () => {
        let subjectImages = fs.readdirSync(source);
        let subjectNames = subjectImages.filter(sn => sn !== 'Thumbs.db').map(n => subject.nameFromFilename(n));
        return { subjectNames };
      };
      return ret;      
    } else {
      throw 'unrecognized reader type: ' + type; 
    }

  }
};

let apiReaderFactory = {
  getReader: (type, source) => {
    let ret = { source };
    if('json' === type) {
      ret.getSubjects = () => {

      };
    } else {
      throw 'unrecognized reader type: ' + type;  
    }

    return ret;
  }
};

let reconcile = (set1, set2) => {
  return {
    set2missing: set1.elements.filter(x => !set2.elements.includes(x)),
    set1missing: set2.elements.filter(x => !set1.elements.includes(x))
  }
};

module.exports = { apiReaderFactory, imageLibraryReaderFactory, yearbookReaderFactory, reconcile };
