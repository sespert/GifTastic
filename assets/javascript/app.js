$(function() {

   


   $("button").on("click", function() {
    var sport = $(this).attr("data-sport");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        sport + "&api_key=n7jEtPuLzxf0OwIPVxFriNLrCeMwrDRD&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {

            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $('<div class="col-md-4">');
                var p = $("<p>");
                p.text(results[i].rating);
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height.url);
                gifDiv.append(p);
                gifDiv.append(gifImage);
                $("#giphys").prepend(gifDiv);
            }


          });

   });


})