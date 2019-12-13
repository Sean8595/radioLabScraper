var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/radioLabDB", { useNewUrlParser: true });
require("../server")
var db = require("../models")
module.exports = function(app) {
app.get("/", function(req, res) {
    db.RadioLab.find({}).then (function(response){
      res.render("index", { articles: response });
    })
});
}