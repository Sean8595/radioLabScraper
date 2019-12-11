module.exports = function(app) {
app.get("/", function(req, res) {
    db.scrapedData.find({}).then (function(response){
      res.render("index", { articles: response });
    })
});
}