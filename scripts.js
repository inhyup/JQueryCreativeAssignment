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
var statesUrl = 'https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_titlecase.json';
$.getJSON(statesUrl, function(json) {
  var optionList = '';
  $.each(json, function(i, item) {
    optionList += '<option value="' + item.abbreviation + '">' + item.name + '</option>'
  });
  $('#state').html(optionList);
});

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
      $('#error').html('Invalid city or state name');
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
