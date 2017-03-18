jQuery(document).ready(function ($) {
    $.ajax({
        url: "http://api.wunderground.com/api/5fe720d60e373978/conditions/q/CA/Greenville.json",
        dataType: "jsonp",
        success: function (data) {
            var location = data.current_observation.display_location.city;
            var temp_f = data.current_observation.temp_f;
            alert("Current temperature in " + location + " is: " + temp_f);
            var locName = $('#locName');
            var hightemp = $('#hightemp');
            var something = $('#something');

            locName.text(location);
            hightemp.text(temp_f);
            something.text("Current temperature in " + location + " is: " + temp_f);
        }
    });
});
