var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var subjectSchema = new Schema({
  name:         String,
  display_name: String,
  image_count:  Number,
  is_active:    Boolean,
  date_added:   Date
});

module.exports = mongoose.model('Subject', subjectSchema);
