$(function() {
    //Create array to populate buttons
    var topics = ["soccer", "basketball", "tennis", "football", "field hockey", "baseball"];
    //For loop to generate buttons with each of the array topics
    for (var j=0; j<topics.length; j++) {
        var newButton = $('<button class="sportSelected mr-2">');
        newButton.attr("data-sport", topics[j]);
        newButton.text(topics[j]);
        $("#buttons").append(newButton);
    }
    //Function that generates 10 gif when user clicks on each button
    function gifGenerator(input) {   
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            input + "&api_key=n7jEtPuLzxf0OwIPVxFriNLrCeMwrDRD&limit=10";
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data;
            //For each of the objects returned from the giphy api, loop to obtain images and ratings...
            for (var i = 0; i < results.length; i++) {
               //...then create divs for each new gif 
                var gifDiv = $('<div class="col-md-4">');
                var p = $("<p>");
                p.text(results[i].rating);
                var gifImage = $('<img class="gif">');
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                gifImage.attr("data-state", "still");
                gifDiv.append(gifImage);
                gifDiv.append(p);                
                $("#giphys").prepend(gifDiv);

                //When user clicks on each gif, it starts and it pause when click again
                $(".gif").on("click", function() {
                    var state = $(this).attr("data-state");

                    if (state === "still") {
                        console.log("still");
                        var urlAnimate = $(this).attr("data-animate");
                        $(this).attr("src", urlAnimate);   
                        $(this).attr("data-state", "animate");
                    }   else if (state === "animate") {
                        console.log("animate");
                        var urlStill = $(this).attr("data-still");
                        $(this).attr("src", urlStill);
                        $(this).attr("data-state", "still");
                    }                     
                });
            }
        });
    }
   
    //Function that calls the gifGenerator function when each button is called
   $("button").on("click", function() {
        //Before showing the gifs, clean the screen from previous gifs
        $("#giphys").empty();
        gifGenerator($(this).attr("data-sport"));
   });

   //If user wants to add a new topic, take the input of the submit form and generate a new button to be clicked
   $("#select-sport").on("click", function() {        
    var userSport = $("#sport-input").val().trim();   
    var userButton = $('<button class="sportSelected mr-2">');
    userButton.attr("data-sport", userSport);
    userButton.text(userSport);
    $("#buttons").append(userButton);
    
        $("button").on("click", function() {
            $("#giphys").empty();
            gifGenerator($(this).attr("data-sport"));
        });

    })
})


