var centerPoint = {lat: 34.04924594193164, lng: -118.24104309082031};

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: centerPoint
  });

  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);
}

$(document).ready(function() {
$('#submit').click(function(e) {
  e.preventDefault();
  var $city = $('#city')[0].value;
  var $state = $('#state')[0].value;
  var urlLatLng = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
    $city.replace(' ', '+') + ',' + $state + '&key=AIzaSyCpzKXrhtmAX0uUr0Jytc5GXWecUn8kB08';
  $.getJSON(urlLatLng, function(json) {
    if (json.results.length > 0) {
      $('#error').html('');
      centerPoint = json.results[0].geometry.location;
      initMap();
    }
    else {
      $('#error').html('Invalid City or Stat Name');
    }
  })
  .done(function() { console.log('get latlng getJSON request succeeded!'); })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log('latlng getJSON request failed! ' + textStatus);
    console.log("incoming "+jqXHR.responseText);
  })
  .always(function() { console.log('auto complete getJSON request ended!');
  });
});
});
