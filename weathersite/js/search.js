
// Current Location Scripts
$(function () {

    $('#query').keyup(function(){
        $("#searchResults").css("display", "block");
        var value = $('#query').val();
        var rExp = new RegExp(value, "i");

        $.getJSON("//autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
            console.log(data);
            // Begin building output
            var output = '<ol>';
            var i = 0;
            $.each(data.RESULTS, function(key, val) {
                if (val.name.search(rExp) != -1) {
                    output += '<li>';
                    output += '<a href=# value="' + val.lat + ',' + val.lon + '">' + val.name + '</a>';
                    output += '</li>';
                }
            }); // end each
            output += '</ol>';
            $("#searchResults").html(output); // send results to the page
        }); // end getJSON

    }); // end keyup

    $( "#searchResults" ).on( "click", "a", function(ev) {
        var loc = $(this).attr("value");
        getData(loc);

        $("#searchResults").css("display", "none");
    });

    // Get the data from the wunderground API
    function getData(location){

        console.log(location);

        $.ajax({
            url : "https://api.wunderground.com/api/5fe720d60e373978/geolookup/forecast/conditions/q/" + location + ".jsonp",
            dataType : "jsonp",
            success : function(data) {
                console.log(data);
                $("h1").html(data.location.city + ", " + data.location.state);
                $("#hi-lo li:nth-child(1)").html("High: " + data.forecast.simpleforecast.forecastday["0"].high.fahrenheit + "&deg;,<sup>F</sup>");
                $("#hi-lo li:nth-child(2)").html("Low: " + data.forecast.simpleforecast.forecastday["0"].low.fahrenheit + "&deg;,<sup>F</sup>");

            }
        });
    }

    // A function for changing a string to TitleCase
    function toTitleCase(str){
        return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
});
