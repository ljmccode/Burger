// Once DOM is loaded
$(function () {
    // create new burger on clicking submit btn
    $(".create-form").on("submit", function (event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#newburger").val().trim(),
            devoured: 0
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function() {
            console.log("Burger added");
            // Reloads page with updates
            location.reload();
        });
    });

    $(".eatburger").on("click", function (event) {
        event.preventDefault();

        var id = $(this).data("id");
        var isDevoured = {
            devoured: 1
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: isDevoured
        }).then(function () {
            console.log("Burger has been eaten");
            location.reload();
        });
    });

    $(".trashburger").on("click", function(event) {
        event.preventDefault();
        var id = $(this).data("id");
    
        // Send the DELETE request.
        $.ajax({
          type: "DELETE",
          url: "/api/burgers/" + id
        }).then(function() {
            console.log("trashed burger", id);
            // Reload the page to get the updated list
            location.reload();
          }
        );
      });
});
