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
//Purpose:	  Calculate the arccossine and return the angle in degrees
//Parameters: The cossine value of the triangle 
//Returns:    Angle in degrees
function ArcCosDeg(x) { 
  var deg = Math.acos(x)  * 180 / Math.PI;
  return deg;
}

//-----------------------------------------------------------------------//

//Function:   CosDeg()
//Purpose:	  Calculate the cossine of the triangule
//Parameters: Angle in degrees 
//Returns:    Tangente value 
function CosDeg(Angle) {   
  var deg = Math.cos(Angle * Math.PI / 180);
  return deg;
}

//-----------------------------------------------------------------------//

//Function:   ArcTanDeg()
//Purpose:	  Calculate the arcsine and return the angle in degrees
//Parameters: The sine value of the triangle 
//Returns:    Angle in degrees
function ArcSinDeg(x) {  
  var deg = Math.asin(x)  * 180 / Math.PI;
  return deg;
}

//-----------------------------------------------------------------------//

//Function:   SinDeg()
//Purpose:	  Calculate the sine of the triangule
//Parameters: Angle in degrees 
//Returns:    Tangente value 
function SinDeg(Angle) { 
  var deg = Math.sin(Angle * Math.PI / 180);
  return deg;
}

//-----------------------------------------------------------------------//

//Function:   Orientation (numPoly)
//Purpose:	  Calculate the roof orientation in degrees (Azimuth Angle)
//Parameters: Polygon that you want to calculate
//Returns:    The roof orientation in degrees 
function Orientation (numPoly) {
// Input_1 (Lat): Array with values of latitude for a polygon.
// Input_2 (Lng): Array with values of longitude for a polygon.
// Output: Roof orientation (Surface Azimuth Angle [degrees])
    
    var deltaLat = selections[numPoly][0].lat() - selections[numPoly][1].lat();   
    // Difference between the latitude of two points at the same height.
    var deltaLng = selections[numPoly][0].lng() - selections[numPoly][1].lng();      
    // Difference between the longitude of two points at the same height.
    
    // To get the point that represents the opositive side of the roof orientation.
    if (selections[numPoly].length === 3 || selections[numPoly].length === 4) {
        var midLat = selections[numPoly][2].lat();
        var midLng = selections[numPoly][2].lng(); 
    }
    else if (selections[numPoly].length % 2 === 1) {    // lenght is odd
        var midLat = selections[numPoly][Lat.length/2 + 0.5].lat();
        var midLng = selections[numPoly][Lng.length/2 + 0.5].lng(); 
    }
    else {                              // lenght is even
        var midLat = selections[numPoly][Lat.length/2].lat();
        var midLng = selections[numPoly][Lng.length/2].lng(); 
    }
    
    // A auxiliar line will be created to make the calculations more simple  (y = slope*x + inter)
    // Where "y" represents Latitude and "x" represents Longitude.
    if (deltaLng === 0) {   
        var slopeAngle = 90;     
        // To avoid errors by zero division
    }
    else {
        var slope = deltaLat/deltaLng;          
        // line slope (a = deltaLat/deltaLng)
        var inter = selections[numPoly][0].lat() - slope*selections[numPoly][1].lng();      
        // line interssection  (inter = y - slope*x) 
        var slopeAngle = ArcTanDeg(slope);       
        // Perperdicular angle of the roof orientation
        var projY = slope * midLng + inter;     
        // ProjY is responsible to indicate the orientation based on the perpendicular angle
    }
    
        if (slopeAngle > 0 && slopeAngle < 90) {
        
        if (midLat > projY) {       
            // South East Orientation -> Azimuth Angle:  Between -90 and 0 degrees
            var orient = -slopeAngle;
        }
        else if (midLat < projY) {  
            // North West Orientation -> Azimuth Angle: Between 90 and 180 degrees
            var orient = 90 + (90 - slopeAngle);
        }
    }
    
    else if (slopeAngle < 0 && slopeAngle > -90) {
        
        if (midLat > projY) {  //WARNING: In this case the slope is negative     
            // South West Orientation -> Azimuth Angle:  Between 0 and 90 degrees
            var orient = -slopeAngle;
        }
        else if (midLat < projY) {  //WARNING: In this case the slope is negative
            // North East Orientation -> Azimuth Angle: Between -90 and 180 degrees
            var orient = -(90 + (90 + slopeAngle));
        }
    }
    
    else if (slopeAngle === 0){
        
        if (midLat > selections[numPoly][0].lat()) {      
            // South Orientation -> Azimuth Angle = 0 degrees
            var orient = 0;
        }
        else if (midLat < selections[numPoly][0].lat()) {
            // North Orientation -> Azimuth Angle = 180 degrees
            var orient = 180;
        }        
    }
    
    else if (slopeAngle === 0){
        
        if (midLng > selections[numPoly][0].lng()) {      
            // West Orientation -> Azimuth Angle = 90 degrees
            var orient = 90;
        }
        else if (midLng < selections[numPoly][0].lng()) { 
            // East Orientation -> Azimuth Angle = -90 degrees
            var orient = -90;
        }        
    }
    
return orient;
}


//-------------------------------COMMANDS--------------------------------//

//run the function and initialyze the map
initMap();

//run the function and initialyze the drawing tool/manager
initDrawing();

//create an action for the "Load Address" button
document.getElementById('load-addresses').addEventListener('click', function() {
  geocodeAddress(geocoder, map);
});

document.getElementById('generate-output').addEventListener('click', function() {
  var Orient = Orientation (1);
  console.log(Orient);             //test-function - not done already
});
