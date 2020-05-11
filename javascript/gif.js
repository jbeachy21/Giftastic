
var topic = ["Pulp Fiction", "Kill Bill", "Inglorious Basterds", "Deadpool", "Mission Impossilbe: Fallout", "Avengers: Infinity War", 
"Doctor Strange", "Thor: Ragnarok", "Tron", "Wonder Woman", "The Matrix Reloaded", "X-men: The Last Stand", "Weekend at Bernies",
"Spaceballs", "Black Panther", "Sausage Party", "Scarface", "Django Unchained", "Interstellar", "Zootopia", "The Secret Life of Pets", 
"The Breakfast Club", "Ghostbusters", "E.T", "War for the Planet of the Apes", "Boogie Nights", "Zombieland", "Star Trek: Beyond", 
"Harry Potter and the Deathly Hallows", "Jumanji", "The Hobbit", "The Lord of the Rings Trilogy", "Iron Man", "Star Wars", "Watchmen",
"Avatar", "Blow", "The Godfather", "Terminator", "Guardians of the Galaxy", "The Big Lebowski", "Monty Python and the Holy Grail",
"Princess Mononoke", "Gladiator", "The Dark Knight", "Fight Club", "Casablanca", "Reservoir Dogs", "Blade Runner 2049", "Top Gun", 
"Neverending Story"];




function makeButtons() {
    for (var i = 0; i < topic.length; i++) {
        
        var a = $("<button>");
        
        a.addClass("topic");
        
        a.attr("data-name", topic[i]);
        
        a.attr("id", "movieButton");

        a.text(topic[i]);
        
        $("#buttons-view").append(a);

        if (i % 2 === 0) {
            a.addClass("btn btn-outline-primary");
        }
        else {
            a.addClass("btn btn-outline-success");
        }
        
      }
}


function addButton () {
     
    var submit = $("<button>");
    var text = $("<input>");
 
    submit.addClass("form-group btn-primary btn-lg");
    text.addClass("form-control form-control-sm-6");

    //Specifies type 
    text.attr("type","text");
    submit.attr("type","submit");

    //Assigns ids
    text.attr("id","textbox");
    submit.attr("id","submitButton");

    submit.text("Submit");
    

    text.attr("placeholder","Please enter desired movie name here");

    //Add form to the div
    $("#buttons-add").append(text);
    $("#buttons-add").append("<br>");
    $("#buttons-add").append(submit);
}




$(document).ready(function() {

    $("#Welcome").text("Welcome to GifTastic!");
    $("#start").text("To begin, either click a button to generate GIFs or type in a button to add GIFs with");
    $("#start2").text("You may also make a button pretaining to a director or a studio, for example, Christopher Nolan or Marvel Studios respectively");
    
    makeButtons();
    addButton();

   
    $("#submitButton").click(function() {
        var movie = $("#textbox").val();
        var a = $("<button>");
        a.addClass("topic");
        a.attr("data-name", movie);
        a.text(movie);
        a.attr("id", "movieButton");
        var size = topic.push(movie);
        $("#buttons-view").append(a);
        var buttonColor = size+1;
        if (buttonColor % 2 === 0) {
            a.addClass("btn btn-outline-primary");
        }
        else {
            a.addClass("btn btn-outline-success");
        }
        $("#textbox").val("");
        
    })

    $(document).on("click", "#movieButton", function() {
        var movieName = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=jJ0FBfi3dIcdhlxVZUe2XZMU6RnWcwX2&q=" + movieName + " movie&limit=25&lang=en";
        
        $("#gifs-div").empty();
        
        
        $.ajax({
            url: queryURL,
            method: "GET"


        }).then(function(response) {
            
            var results = response.data;
            for (var i = 0; i<results.length; i++) {
                var gifs = $("<div>");
                gifs.addClass("text-center");
                var rating = "Rating: " + results[i].rating;
                var GifImage = $("<img>");
                GifImage.addClass("img-thumbnail");
                GifImage.attr("src", results[i].images.fixed_height.url);
                GifImage.attr("data-playing",results[i].images.fixed_height.url);
                GifImage.attr("data-pause", results[i].images.fixed_height_still.url)
                GifImage.addClass("gif");
                $(GifImage).attr("play", "playing");
                gifs.append(rating);
                gifs.prepend(GifImage);
                $(GifImage).attr("id", "movie");
                $("#gifs-div").append(gifs);
    
            }

        })

    })

    
    
    $(document).on("click", ".gif", function () {
       
        
        var pausedImage = $(this).attr("data-pause");
        var playingImage = $(this).attr("data-playing");
        


        //pauses gif
        if ($(this).attr("play") === "playing") {
            $(this).attr("play","still");
            
            $(this).attr("src", pausedImage);
             
        }
        //plays gif
        else {
            
            $(this).attr("src",playingImage);
            $(this).attr("play","playing");
        }
        
    })

    

});
