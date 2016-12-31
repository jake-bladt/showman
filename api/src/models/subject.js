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
  let outString = workingString.substring(0, 1);
};

module.exports = model;
