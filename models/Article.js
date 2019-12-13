var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var RadioLabSchema = new Schema({
    // `title` is required and of type String
    title: {
      type: String,
      required: true
    },
    teaser: {
        type: String,
        required: true
    },
    link: {
      type: String,
      required: true
    },
    note: {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  });
  var RadioLab = mongoose.model("RadioLab", RadioLabSchema);

// Export the Article model
module.exports = RadioLab;
