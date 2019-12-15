var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var RadioLabSchema = new Schema({
    // `title` is required and of type String
    title: {
      type: String,
      required: false,
      unique: false
    },
    teaser: {
        type: String,
        required: false
    },
    link: {
      type: String,
      required: false
    },
    note: {
      type: Schema.Types.ObjectId,
      ref: "Note"
    },
    saved: {
      type: Boolean,
      value: false,
      ref: "Saved"
    },
    date: {
      type: String,
      required: false
    }
  });
  var RadioLab = mongoose.model("RadioLab", RadioLabSchema);

// Export the Article model
module.exports = RadioLab;
