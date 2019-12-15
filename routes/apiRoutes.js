var router = require("express").Router();
var axios = require("axios");
var cheerio = require('cheerio');
var db = require("../models")
// Hook mongojs configuration to the db variable
router.get("/scrape", function(req, res) {
    axios
      .get("https://www.wnycstudios.org/podcasts/radiolab")
      .then(function(response) {
        // Load the body of the HTML into cheerio
        var $ = cheerio.load(response.data);
        // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
        $(".episode-tease__details").each(function(i, element) {
          var title = $(element)
            .children()
            .find("a")
            .text();
          var link = $(element)
            .children()
            .find("a")
            .attr("href");
          var tease = $(element)
            .find(".episode-tease__tease")
            .attr("div")
          db.RadioLab.create({
            title: title,
            tease: tease,
            link: link,
          });
          console.log(tease);
        });
        res.send("index")

      });
  });
 router.get("/", function(req, res) {
    // Grab every document in the Articles collection
    db.RadioLab.find({})
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
  router.get("/articles/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.RadioLab.findOne({ _id: req.params.id })
      // ..and populate all of the notes associated with it
      .populate("note")
      .then(function(dbArticle) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
  module.exports = router;