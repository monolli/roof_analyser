(function(window,mapster){

	var options = mapster.MAP_OPTIONS,

  element = document.getElementById('map');

	map = mapster.create(element, options);
	map.zoom(18);
	//map.gMap.setZoom(10);
	//alert(map.gMap.getZoom());
}(window, window.Mapster));

