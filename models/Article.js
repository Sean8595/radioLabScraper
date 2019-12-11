var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
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
  var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
