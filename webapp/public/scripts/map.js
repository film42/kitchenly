$(document).ready(function() {

  var map;
  var markers = [];
  var geocoder;
  
 $('#map-canvas').attr('style','height:200px; margin-bottom:28px;');
  
  initialize();
  
  function initialize() {
    geocoder = new google.maps.Geocoder();
  
    var myOptions = {
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
    codeAddress("84403");
    addMarker("1948 W 1460 E, Provo, UT 84003", "Bountiful Bistro");
    addMarker("1417 29th St, Ogden, UT 84403", "Fiesta Time");
    addMarker("600 N 600 E, Provo, UT 84604", "Meatballs by Mike");
    addMarker("42 N University Ave #204, Provo, UT 84601", "Saigon Kitchen");
    addMarker("911 123rd Ave NE, Lake Stevens, WA 98258", "Homeland Thai Food");
    addMarker("1750 Victor Street, Bellingham, WA 98225", "The Horn");
    addMarker("1312 14th st Ogden, UT 84403", "The Veggie Yurt");
  }
  
  function codeAddress(address) {
    geocoder.geocode({
      'address': address
    }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  
  }
  
  function addMarker(address, myTitle) {
    geocoder.geocode({
      'address': address
    }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var marker = new google.maps.Marker({
          map: map,
          title: myTitle,
          position: results[0].geometry.location
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }

});