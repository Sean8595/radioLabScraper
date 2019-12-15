var router = require("express").Router();
var db = require("../models");

// module.exports = function(app) {
  router.get("/", function(req, res) {
    db.RadioLab.find({}).then(function(response) {
      console.log(response)
      res.render("index", { articles: response });
    });
  });
// };

module.exports = router;
