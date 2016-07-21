/*
Lucas Monteiro de Oliveira
Summer 2016
Tab == 4 spaces
*/

//Global variables
var map;




//#MAP_CREATION #START
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
    	minZoom: 9,
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
//#MAP_CREATION #END




//#GEOCODE #START
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
//#GEOCODE #END




//#DRAWING_TOOL #START
//Function: initDrawing()
//Purpose:	initialize the drawing tool
//Parameters:	none
//Returns:	nothing
function initDrawing(){
    var polyOptions = {
        fillColor: '#E58447', //orange
        strokeColor: '#333333', //drak grey
        strokeWeight: 1,
        fillOpacity: 0.4,
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
        markerOptions: {
            draggable: true
        },
        polylineOptions: {
            editable: true
        },
        polygonOptions: polyOptions,
        map: map
    });
}
//#DRAWING_TOOL #END




//                              Commands
//----------------------------------------------------------------------------//

//run the function and initialyze the map
initMap();

//run the function and initialyze the drawing tool/manager
initDrawing();

//create an action for the "Load Address" button
document.getElementById('load-addresses').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
});

