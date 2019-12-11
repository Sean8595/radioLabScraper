module.exports = function(app) {
app.get("/scrape", function(req, res) {
    axios
      .get("https://www.wnycstudios.org/podcasts/radiolab")
      .then(function(response) {
        // Load the body of the HTML into cheerio
        var $ = cheerio.load(response.data);
  
        // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
        $(".episode-tease").each(function(i, element) {
          // Save the text of the h4-tag as "title"
          var title = $(element)
            .children()
            .find("a")
            .text();
          // Find the h4 tag's parent a-tag, and save it's href value as "link"
          var link = $(element)
            .children()
            .find("a")
            .attr("href");
          var tease = $(element)
            .children()
            .find(".episode-tease__tease")
            .text()
            .trim();
          // Make an object with data we scraped for this h4 and push it to the results array
          db.scrapedData.insert({
            title: title,
            link: link,
            tease: tease
          });
          console.log(title);
          res.send("scraped!")
        });
      });
  });
}