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
    function gifGenerator(input,num) {   
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            input + "&api_key=n7jEtPuLzxf0OwIPVxFriNLrCeMwrDRD&limit=10&offset=" + num;
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data;
            //For each of the objects returned from the giphy api, loop to obtain images and ratings...
            for (var i = 0; i < results.length; i++) {
               //...then create divs for each new gif 
                var gifDiv = $('<div class="col-md-4">');
                var h4 = $("<h4>")
                h4.text("Title: " + results[i].title);
                var p = $("<p>");
                p.text("Rated: " + results[i].rating);
                var gifImage = $('<img class="gif">');
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                gifImage.attr("data-state", "still");
                gifDiv.append(gifImage);
                gifDiv.append(h4);
                gifDiv.append(p);                
                $("#giphys").prepend(gifDiv);
            }
        });
    }
   
    //Function that calls the gifGenerator function when each button is called
   $(".sportSelected").on("click", function() {
        
        //In order for the gifs to be different, we add the offset variable in the queryURL call
        var offset = 0;
        
        //Before showing the gifs, clean the screen from previous gifs        
        $("#giphys").empty();
        gifGenerator($(this).attr("data-sport"), offset);

        //If user wants more gifs, he can click the Add More Gifs Button so the 
        //gifGenerator function is called again, with the same value of the sport selected
        var sportInput = $(this).attr("data-sport");

        $("#moreGifs").on("click", function() {
            offset=offset+10;
            gifGenerator(sportInput, offset);
        });

        
       
        
   });

   //When user clicks on each gif, it starts and it pause when click again
   $(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");

        if (state === "still") {
            var urlAnimate = $(this).attr("data-animate");
            $(this).attr("src", urlAnimate);   
            $(this).attr("data-state", "animate");
        }   else if (state === "animate") {
            var urlStill = $(this).attr("data-still");
            $(this).attr("src", urlStill);
            $(this).attr("data-state", "still");
        }                     
    });

   //If user wants to add a new topic, take the input of the submit form and generate a new button to be clicked
   $("#select-sport").on("click", function() {        
    var userSport = $("#sport-input").val().trim();   
    var userButton = $('<button class="sportSelected mr-2">');
    userButton.attr("data-sport", userSport);
    userButton.text(userSport);
    $("#buttons").append(userButton);
    
        $(".sportSelected").on("click", function() {
            var offset = 0;
            $("#giphys").empty();
            gifGenerator($(this).attr("data-sport"), offset);

            var sportInput = $(this).attr("data-sport");
        
            $("#moreGifs").on("click", function() {
                offset=offset+10;
                gifGenerator(sportInput, offset);
            });
        });

        
       

    })

   

    

});


