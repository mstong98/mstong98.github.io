$(function () {

    $.getJSON("./js/acme.json", function (data) {
        console.log(data);

        var output = '<ul><li><a href="https://mstong98.github.io/">Home</a></li>';
        var counter = 0;

        $.each(data.Navigation, function() {
            output += '<li>';
            output += '<a href=#' + counter + '>' + data.Navigation[counter] + '</a>';
            output += '</li>';
            counter++;
        });
output += "</ul>";
        $("#navbar").html(output);
    }); // end getJSON

});

$( "#navbar" ).on( "click", "a", function(ev) {

    var item = $(this).text();

    if( item == "Home") {
        makeHomePage();
    } else {
        getData(item);
    }
});

function getData(item){

    console.log(item);

    $.ajax({
        url : "./js/acme.json",
        dataType : "json",
        success : function(data) {
            console.log(data[item].name);
            $("#product").css("display", "flex");
            $("#productive").text(data[item].name);
            $("#description").css("background-image", "url(" + data[item].path + ")");
            $("#displaying").css("display", "none");
			
            var output = '';

            output += "<li>" + data[item].description + "</li>"
            output += '<li><strong>Made by: </strong>' + data[item].manufacturer + '</li>';
            output += '<li><strong>Reviews: </strong>' + data[item].reviews + '/5 stars</li>';
            output += '<li><h2>Price: $' + data[item].price + '</h2></li>';

            $("#description").html(output);

            $("#description h2").css("color", "#de2226");
        }
    });
}

function makeHomePage() {
    $("#displaying").css("display", "flex");
    $("#product").css("display", "none");
}