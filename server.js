//Dependencies
var express = require("express");
var mongojs = require("mongojs");
var logger = require("morgan");
var mongoose = require('mongoose')
//use these to scrape
var cheerio = require("cheerio");
var axios = require("axios");
//initalize express
var app = express();
var exphbs = require("express-handlebars");
var databaseUrl = "radioLabDB";
var collections = ["radioLab"];

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(logger("dev"));
mongoose.connect("mongodb://localhost/radioLabDB", { useNewUrlParser: true });

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});
// Listen on port 3000
app.listen(3000, function() {
  console.log("==> 🌎 App running on port 3000!");
});
module.exports = app;