var topics = ["bunny", "elephant", "orca", "elk", "grizzly bear", "gazelle", "cougar", "wolf"];

for (var i = 0; i < topics.length; i++) {
    var buttons = $('<button id="button">'+ topics[i] +'</button>')
    buttons.appendTo('#topicButton');
}

$("#topicButton").on("click",'button', function(){

var animal = $(this).text();

var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" +
animal + "&api_key=dO4C4bIu1rFOEoPQjZ1XLcy3sRgmF3BF&limit=10";

$.ajax({
    url: queryUrl,
    method: "GET",
    })

    .then(function(response){

        var results = response.data;

        console.log(results);

        for (var i = 0; i < results.length; i++){

            var gifDiv = $("<div class='col-md-4'>");

            var rating = results[i].rating;
            var animatedGif = results[i].images.fixed_height.url;
            var staticGif = results[i].images.fixed_height_still.url;
            var animalImage = $('<img>');
            var p = $('<p>').text("Rating: " + rating);

            animalImage.attr("src", staticGif);
            animalImage.attr("data-state", "still");
            animalImage.attr("data-still", staticGif);
            animalImage.attr("data-animate", animatedGif)

            gifDiv.append(p);
            gifDiv.prepend(animalImage);

            $("#gifs-appear-here").prepend(gifDiv);
            
        }
            
    })
})

// Create a click function that animates gif images ??
$(document).on("click", function imageChangeState() {          

    var state = $(this).attr("data-state");
    var animateImage = $(this).attr("data-animate");
    var stillImage = $(this).attr("data-still");

    if(state == "still") {
        $(this).attr("src", animateGif);
        $(this).attr("data-state", "animate");
    }

    else if(state == "animate") {
        $(this).attr("src", staticGif);
        $(this).attr("data-state", "still");
    }
})

//When user clicks on submit or hits enter pushes what user typed into the array
var input = document.getElementById("animalInput");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(e) {
  // Cancel the default action, if needed
  e.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    document.getElementById("userInput").click();
  }
  topics.push(input);
  
});
