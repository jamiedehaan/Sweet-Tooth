var topics = ["Brownie", "Cake", "Cheesecake", "Candy", "Cookie", "Cupcake", "Donut", "Ice Cream", "Pastry", "Pie"];

function renderButtons() {

    $("#buttonDiv").empty();

    for (var i = 0; i < topics.length; i++) {

        var a = $("<button>");

        a.addClass("treatBtn");

        a.attr("data-name", topics[i]);

        a.text(topics[i]);

        $("#buttonDiv").append(a);
    }
}

renderButtons();

$("#addDeliciousTreat").on("click", function (event) {

    event.preventDefault();

    var treat = $("#sweetToothInput").val().trim();

    topics.push(treat);

    renderButtons();
});

$("#buttonDiv").on("click", ".treatBtn", function () {

    var treat = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        treat + "&api_key=BDlOoPyMN7XbNmufsSFE75DcRLJFFmB1&limit=10";

    // API KEY: BDlOoPyMN7XbNmufsSFE75DcRLJFFmB1

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {

            console.log(queryURL);

            console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var treatDiv = $("<div class='newTreatDiv'>");

                var p = $("<p>").text("Rating: " + results[i].rating);

                var treatImage = $("<img>");

                treatImage.attr("src", results[i].images.fixed_height_still.url);
                treatImage.attr("data-still", results[i].images.fixed_height_still.url);
                treatImage.attr("data-animate", results[i].images.fixed_height.url);
                treatImage.attr("data-state", "still");
                treatImage.attr("class", "gif");

                treatDiv.append(p);
                treatDiv.append(treatImage);

                $("#gifs-appear-here").prepend(treatDiv);
            }
        });
});

$(document).on("click", ".gif", function () {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});