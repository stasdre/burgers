var marcers = [
  [50.4624217, 30.481782],
  [50.416859, 30.532211],
  [50.442835, 30.629157]
];


function initMap() {
  var zoom = 12;
  
  if (window.innerWidth <= 480){
    zoom = 11;
  }


  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 50.4527056,
      lng: 30.5473506
    },
    zoom: zoom,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false    
  });
  setMarkers(map);
}

function setMarkers(map) {
  var image = {
    url: '../dist/img/map-marker.svg',
    size: new google.maps.Size(46, 57),
  };
  for (var i = 0; i < marcers.length; i++) {
    var data = marcers[i];
    var marker = new google.maps.Marker({
      position: {lat: data[0], lng: data[1]},
      map: map,
      icon: image,
    });
  }
}