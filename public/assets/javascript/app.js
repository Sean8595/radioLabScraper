// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $("#save").on("click", function(event) {
    var id = $(this).data("id");
    var newArticle = $(this).data("newStatus");
    console.log("Clicked")

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

$(function() {
  $("#delte").on("click", function(event) {
    var id = $(this).data("id");
    var newArticle = $(this).data("newStatus");
    console.log("Clicked")

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
  })
})