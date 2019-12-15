// Whenever someone clicks a p tag
$("#save").on("click", function() {
  // Empty the notes from the note section
  console.log("Clicked")
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
  });
///////////////////////////////////////////////////

// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".save").on("click", function(event) {
    var id = $(this).data("id");
    var newArticle = $(this).data("newStatus");

    var newStatus = {
      saved: newArticle
    };

    // Send the PUT request.
    $.ajax("/articles/" + id, {
      type: "PUT",
      data: newStatus
    }).then(
      function() {
        console.log("Saved article", newArticles);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var savedArt = {
      kindof: $("#art").val().trim(),
      eaten: $("[name=eaten]:checked").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/hotdogs", {
      type: "POST",
      data: newDog
    }).then(
      function() {
        console.log("created new dog");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".delete-cat").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/hotdogs/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted hotdog", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
