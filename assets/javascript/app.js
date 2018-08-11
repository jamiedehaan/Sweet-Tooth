$("button").on("click", function () {

    var topics = ["Brownie", "Cake", "Cheesecake", "Candy", "Cookie", "Cupcake", "Donut", "Ice Cream", "Pastry", "Pie"];

    var treat = $(this).attr("data-treat");

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

                var treatDiv = $("<div>");

                var p = $("<p>").text("Rating: " + results[i].rating);

                var treatImage = $("<img>");

                treatImage.attr("src", results[i].images.fixed_height.url);

                treatDiv.append(p);
                treatDiv.append(treatImage);

                $("#gifs-appear-here").prepend(treatDiv);

            }
        });
});