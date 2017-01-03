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
  let workingString = displayName.replace('.', ' ');
  let outString = workingString.substring(0, 1).toUpperCase();
  let prevChar = '';
  for(let i = 1; i < displayName.length; i++) {
    let thisChar = displayName.substring(i, i + 1);
    if(prevChar === ' ' || prevChar === '-') thisChar = thisChar.toUpperCase();
    outString += prevChar;
    prevChar = thisChar;
  }
  return outString;
};

module.exports = model;
