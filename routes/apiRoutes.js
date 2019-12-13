var express = require("express");
var mongojs = require("mongojs");
var logger = require("morgan");
var mongoose = require('mongoose')
var cheerio = require("cheerio");
var axios = require("axios");
var app = express();
var databaseUrl = "radioLabDB";
var collections = ["radioLab"];
app.use(logger("dev"));
mongoose.connect("mongodb://localhost/radioLabDB", { useNewUrlParser: true });

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
module.exports = function(app) {
app.get("/scrape", function(req, res) {
    axios
      .get("https://www.wnycstudios.org/podcasts/radiolab")
      .then(function(response) {
        // Load the body of the HTML into cheerio
        var $ = cheerio.load(response.data);
  
        // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
        $(".episode-tease").each(function(i, element) {
          var title = $(element)
            .children()
            .find("a")
            .text();
          var link = $(element)
            .children()
            .find("a")
            .attr("href");
          var tease = $(element)
            .children()
            .find(".episode-tease__tease")
            .text()
            .trim();
          db.RadioLab.insert({
            title: title,
            link: link,
            tease: tease
          });
          console.log(title);
          res.send("scraped!")
        });
      });
  });
  app.get("/articles", function(req, res) {
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
}