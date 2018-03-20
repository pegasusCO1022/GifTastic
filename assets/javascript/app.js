var topics = ["bunny", "elephant", "orca", "elk", "grizzly bear", "gazelle", "cougar", "wolf"];
var animatedGif;
var staticGif;

function renderButton(){
    $("#topicButton").empty();
for (var i = 0; i < topics.length; i++) {
    var buttons = $('<button class="button">'+ topics[i] +'</button>')
    buttons.appendTo('#topicButton');
}
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
            animatedGif = results[i].images.fixed_height.url;
            staticGif = results[i].images.fixed_height_still.url;
            var animalImage = $('<img>');
            var p = $('<p>').text("Rating: " + rating);

            animalImage.addClass("animal-div");
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
function changeSource() {          

    var state = $(this).attr("data-state");
    var animateImage = $(this).attr("data-animate");
    var stillImage = $(this).attr("data-still");

    if(state == "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }

    else if(state == "animate") {
        $(this).attr("src", $(this).attr('data-still'));
        $(this).attr("data-state", "still");
    }
}

//When user clicks on submit or hits enter pushes what user typed into the array
var input = document.getElementById("animalInput");

// Execute a function when the user releases a key on the keyboard
// input.addEventListener("keyup", function(e) {
//   // Cancel the default action, if needed
//   e.preventDefault();
//   // Number 13 is the "Enter" key on the keyboard
//   if (event.keyCode === 13) {
//     // Trigger the button element with a click
//     document.getElementById("userInput").click();
//   }
  
// });

$("#userInput").on("click", function(){
    event.preventDefault();
    var userSubmit = $("#animalInput").val().trim();
    console.log(userSubmit);
    topics.push(userSubmit);
    renderButton();
    $("#animalInput").val("");
})

$(document).on("click", ".animal-div", changeSource)
renderButton();