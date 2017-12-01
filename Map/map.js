var map, infoWindow;
function initMap() {
   map = new google.maps.Map(document.getElementById('map'), {
   center: {lat: 42.057, lng: -87.675},
   zoom: 14,
  });

  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation){
   navigator.geolocation.getCurrentPosition(function(position) {
     var pos = {
       lat: position.coords.latitude,
       lng: position.coords.longitude
     };

     var image = 'images/human-icon.png'
     var beachMarker = new google.maps.Marker({
       position: pos,
       map: map,
       animation: google.maps.Animation.DROP,
       icon: image
     });

     infoWindow.setPosition(pos);
   }, function(){
     handleLocationError(true, infoWindow, map.getCenter());
   });
  } else {
   // Browser doesn't support geolocation
   handleLocationError(false, infoWindow, map.getCenter());
  }
}

var markers = []
function clearMarker(num){
 if(markers[num] != null) {
   markers[num].setMap(null);
   markers[num] = null;
 }
}

function setMarker(number){
 // Place a marker for police station and Hospital
  if (number == 1) {
     var hspMarker = new google.maps.Marker({
     map: map,
     position: {lat: 42.065784, lng: -87.684681},
     label: 'H'
     });
     markers[number] = hspMarker;
     clearMarker(2);
  } else if (number == 2) {
     var psMarker = new google.maps.Marker({
     map: map,
     position: {lat: 42.047568, lng: -87.689453},
     label: 'P'
     });
     markers[number] = psMarker;
     clearMarker(1);
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos){
infoWindow.setPosition(pos);
infoWindow.setContent(browserHasGeolocation ?
                     'Error: The Geolocation service failed.' :
                     'Error: Your browser doesn\'t support geolocation');
infoWindow.open(map);
}
