/*
Lucas Monteiro de Oliveira
E-mail:lumonoli@hotmail.com
Henrique Teixeira Oliveira
E-mail: henrique@gmail.com
Summer 2016
Project Chai Energy
*/


//Global variables
var map;
var selections = [];
var area = [];


//Function: initMap()
//Purpose:	create a standard map object
//Parameters:	none
//Returns:	nothing
function initMap(){
    //map customization goes here
    var map_options = {
    	center: {
    	    lat: 34.020573,
    	    lng: -118.285414
    	},
    	zoom: 15,
    	mapTypeId: google.maps.MapTypeId.SATELLITE, 
    	minZoom: 13,
    	zoomControlOptions: {
    	    position: google.maps.ControlPosition.LEFT_BOTTOM,
    	    style: google.maps.ZoomControlStyle.SMALL
    	}
    }; 
    //create the element by getting the ID
    element = document.getElementById('map');
    //create the map object
    map = new google.maps.Map(element,map_options);
}

//-----------------------------------------------------------------------//

//create a google geocoder
var geocoder = new google.maps.Geocoder();
//Function: geocodeAddress(geocoder,resultMap)
//Purpose:	show the map location according to the given address
//Parameters:	the API geocoder and the map variable that is being used
//Returns:	an alert if the status is != OK or the cropped map
function geocodeAddress(geocoder,resultMap) {
    var address = document.getElementById('address_text_area').value;
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            //set the target coordinates and the zoom in the roof
            lat2 = results[0].geometry.location.lat();
            lng2 = results[0].geometry.location.lng();
            
            resultMap.setCenter({lat: lat2, lng: lng2});
            resultMap.setZoom(20);
            
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}
//-----------------------------------------------------------------------//

//Function: initDrawing()
//Purpose:	initialize the drawing tool
//Parameters:	none
//Returns:	nothing
function initDrawing(){
  var polyOptions = {
      fillColor: '#E58447', //orange
      strokeColor: '#333333', //drak grey
      strokeWeight: 1,
      fillOpacity: 0.8,
      editable: true
  };
  // Creates a drawing manager for drawing polygons
  drawingManager = new google.maps.drawing.DrawingManager({
      //null == starts with dragging tool
      drawingMode: google.maps.drawing.OverlayType.null,
      drawingControlOptions: {    //show only the polygon tool
          drawingModes: [
              google.maps.drawing.OverlayType.POLYGON
          ]
      },
      polygonOptions: polyOptions,
      map: map
  });
  
  google.maps.event.addListener(drawingManager, 'overlaycomplete', function(polygon) {
    var coordinatesArray = polygon.overlay.getPath().getArray();
    selections.push(coordinatesArray);
    //window.alert(selections);
    calc_area();
    //window.alert(coordinatesArray[1].lat());
  });
  
}

//-----------------------------------------------------------------------//

//Function: calc_area()
//Purpose:	calc and store the area of every polygon
//Parameters:	none
//Returns:	nothing

function calc_area(){
  //window.alert(google.maps.geometry.spherical.computeArea(selections[selections.length-1]));
  area.push(google.maps.geometry.spherical.computeArea(selections[selections.length-1]));
  //window.alert(area);
}

//-----------------------------------------------------------------------//

//Function:   ArcTanDeg()
//Purpose:	  Calculate the arctangent and return the angle in degrees
//Parameters: The tangent value of the triangle 
//Returns:    Angle in degrees
function ArcTanDeg(x) {  
  var deg = Math.atan(x)  * 180 / Math.PI;
  return deg;
}

//-----------------------------------------------------------------------//

//Function:   TanDeg()
//Purpose:	  Calculate the tangent of the triangule
//Parameters: Angle in degrees 
//Returns:    Tangente value 
function TanDeg(Angle) {
//Input (slope): Angle value in degrees
//Output: The angle the line in degrees. 
  var deg = Math.tan(Angle * Math.PI / 180);
  return deg;
}

//-----------------------------------------------------------------------//

//Function:   ArcTanDeg()
//Purpose:	  Calculate the arctangent and return the angle in degrees
//Parameters: The tangent value of the triangle 
//Returns:    Angle in degrees
function ArcCosDeg(x) { 
  var deg = Math.acos(x)  * 180 / Math.PI;
  return deg;
}

//-----------------------------------------------------------------------//

//Function:   TanDeg()
//Purpose:	  Calculate the tangent of the triangule
//Parameters: Angle in degrees 
//Returns:    Tangente value 
function CosDeg(Angle) {   
  var deg = Math.cos(Angle * Math.PI / 180);
  return deg;
}

//-----------------------------------------------------------------------//

//Function:   ArcTanDeg()
//Purpose:	  Calculate the arctangent and return the angle in degrees
//Parameters: The tangent value of the triangle 
//Returns:    Angle in degrees
function ArcSinDeg(x) {  
  var deg = Math.asin(x)  * 180 / Math.PI;
  return deg;
}

//-----------------------------------------------------------------------//

//Function:   TanDeg()
//Purpose:	  Calculate the tangent of the triangule
//Parameters: Angle in degrees 
//Returns:    Tangente value 
function SinDeg(Angle) { 
  var deg = Math.sin(Angle * Math.PI / 180);
  return deg;
}

//-----------------------------------------------------------------------//

//-------------------------------COMMANDS--------------------------------//

//run the function and initialyze the map
initMap();

//run the function and initialyze the drawing tool/manager
initDrawing();

//create an action for the "Load Address" button
document.getElementById('load-addresses').addEventListener('click', function() {
  geocodeAddress(geocoder, map);
});
