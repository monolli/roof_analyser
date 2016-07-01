(function(window,mapster){
  //load options
	var options = mapster.MAP_OPTIONS,
  
  //create the element by getting the ID
  element = document.getElementById('map');
  
  //create the actual map
	map = mapster.create(element, options);
	
	
	
	
	
	
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

