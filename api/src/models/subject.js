const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const subjectSchema = new Schema({
  name:         String,
  display_name: String,
  image_count:  Number,
  is_active:    Boolean,
  date_added:   Date
});

var model = mongoose.model('Subject', subjectSchema);

model.displayNameFromName = (displayName) => {
  var workingString = displayName.replace('.', ' ');
  var outString = workingString.substring(0, 1).toUpperCase();
  var prevChar = '';
  for(var i = 1; i < workingString.length; i++) {
    var thisChar = workingString.substring(i, i + 1);
    if(prevChar === ' ' || prevChar === '-') thisChar = thisChar.toUpperCase();
    outString += thisChar;
    prevChar = thisChar;
  }
  return outString;
};

model.nameFromFilename = (fileName) => fileName.replace('.jpg', '');

module.exports = model;
