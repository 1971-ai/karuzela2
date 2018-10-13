'use strict';
var templateCarousel = document.getElementById('template-carousel').innerHTML;
Mustache.parse(templateCarousel);
var listItems = '';
var results = document.querySelector('.main-carousel');
for(var i = 0; i < carouselData.length; i++){
	listItems += Mustache.render(templateCarousel, carouselData[i]);
}
results.insertAdjacentHTML('beforeend', listItems);
var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
  cellAlign: 'left',
  contain: true,
  pageDots: false,
  hash: true
});
var restart = document.getElementById("restart");
restart.addEventListener('click', function(){
	flkty.select(0)
});
var carouselIndex = document.querySelectorAll("#carousel-index a");
for(var i = 0; i < carouselIndex.length; i++){
  (function(i) {
  	carouselIndex[i].addEventListener('click', function(e){
  		e.preventDefault();
      flkty.select(+carouselIndex[i - 1].getAttribute('data-index'));
  	});
  })(i);
}

var progressBar = document.querySelector('.progress-bar')

flkty.on( 'scroll', function( progress ) {
  progress = Math.max( 0, Math.min( 1, progress ) );
  progressBar.style.width = progress * 100 + '%';
});
window.initMap = function() {
  var coords = {lat: 52.463692, lng: 16.903341};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: coords
      });
  for(var i = 0; i < markers.length; i++){
    addMarker(carouselData[i]);
  }
  function addMarker(data){
  var marker = new google.maps.Marker({
    position: data.coords,
    map: map
  });
  marker.addListener('click', function(){
    flkty.select(data.index);
  });

}

}