(function(window,mapster){
  //load options
	var options = mapster.MAP_OPTIONS,
  
  //create the element by getting the ID
  element = document.getElementById('map');
  
  //create the actual map
	var map = mapster.create(element, options);
	var geocoder = new google.maps.Geocoder();
	
	document.getElementById('load-addresses').addEventListener('click', function() {
	  geocodeAddress(geocoder, map);
	});
	
  function geocodeAddress(geocoder,resultsMap) {
	  var address = document.getElementById('address_text_area').value;
	  geocoder.geocode({'address': address}, function(results, status) {
	    if (status === google.maps.GeocoderStatus.OK) {
	      options = {
	        center: {
	          lat: results[0].geometry.location.lat(),
	          lng: results[0].geometry.location.lng()
	        },
	        zoom: 20,
	        mapTypeId: google.maps.MapTypeId.SATELLITE, 
	        minZoom: 4,
	        zoomControlOptions: {
	          position: google.maps.ControlPosition.LEFT_BOTTOM,
	          style: google.maps.ZoomControlStyle.SMALL
	        }
	      };
	      map = mapster.create(element, options);
	    } else {
	      alert('Geocode was not successful for the following reason: ' + status);
	    }
	  });
  }
	
	
	/*function getCoordinates(address,callback){
	      var coordinates;
	      geocoder.geocode({address: address},function (result,status){
	        coordinates = results[0].geometry.location;
	        callback(coordinates);
	     })
	      return coordinates;
	    }
	
	map.getCoordinates('3025 Royal Street,Los Angeles,CA',function(coordinates){
	  console.log(coordinates);
	});
	*/
	
	/*
	
  geocoder = new google.maps.Geocoder();
  
	
	
	function geocode(opts){
	  geocoder.geocode({
	    address:opts.address
	  },function(results, status){
	    if(status == google.maps.GeocoderStatus.OK){
	      opts.success.call(this,result,status);
	    }else{
	      opts.error.call(this,status);
	    }
	  });
	}
	
	geocode({
	  address: '3025 Royal Street, Los Angeles, CA',
	  success: function(results){
	    var result = results[0];
	    map.addMarker({
	      lat: result.geometry.location.lat(),
	      lng: result.geometry.location.lng(),
	      draggable: true
	    });
	  },
	  error: function(status){
	    console.error(status);
	  }
	
	})
	*/
	
	/*//------------------------------------------------
	
	
	
	map._on('click',function(){
	  alert('click');
	  console.log(e);
	  console.log(this);
	});
	
	map._on('dragend',function(){
	  alert('done dragging');
	});
	
	
	//------------------------------------------------*/
	
}(window, window.Mapster));

