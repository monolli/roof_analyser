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
var simAngle = [];
var csvData = [];
var colors = ['#00aedb', '#a200ff',	'#f47835', '#d41243', '#8ec127]'];


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
        	window.alert('Geocode was not successful for the following reason: ' + status);
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
		polygon.setOptions({fillColor:'green'}); 
		// change the fill colour
		//window.alert(coordinatesArray[1].lat());
		//window.alert(area)
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
        var inter = selections[numPoly][0].lat() - slope*selections[numPoly][0].lng();      
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

//-----------------------------------------------------------------------//

//Function:   Sigma (day)
//Purpose:	  Calculate the roof orientation in degrees (Azimuth Angle)
//Parameters: Day of the year (e.i. January 15th - Day = 15 // February 7th = Day = 31 + 7 = 38)
//Returns:    . 
function Sigma (day) {
    
    var B = ((day-1)*(360/365))*(Math.PI/180);
    var sigma =  (180/Math.PI)*(0.006918                             
                    -0.399912*CosDeg(B)+0.070257*SinDeg(B)
                    -0.006758*CosDeg(2*B)+0.000907*SinDeg(2*B)
                    -0.002697*CosDeg(3*B)+0.00148*SinDeg(3*B)); 
    return sigma;
}

//-----------------------------------------------------------------------//

//Function: SunShine (numPoly, sigma)
//Purpose: Calculate the sunset hour.
//Parameters: Polygon that you want to calculate (NumPoly) and the sun declination
//Returns: Sunset hour [h]
function SunShine (numPoly, sigma) {
    var wShine = -ArcCosDeg(-TanDeg(selections[numPoly][0].lat())*TanDeg(sigma));
    // Sunshine hour angle [degrees]
    var hourShine = 12 + wShine/15;                             
    // Sunshine hour [hour]
    return hourShine;                    
}

//-----------------------------------------------------------------------//

//Function: SunSet (numPoly, sigma)
//Purpose: Calculate the sunset hour.
//Parameters: Polygon that you want to calculate (NumPoly) and the sun declination (sigma)
//Returns: Sunset hour [h]
function SunSet (numPoly, sigma){
    var wSet = ArcCosDeg(-TanDeg(selections[numPoly][0].lat())*TanDeg(sigma));      
    // Sunset hour angle [degrees]  
    var hourSet = 12 + wSet/15;                                   
    // Sunset hour [hour]   WARNING: THE VALUE OF wSET is NEGATIVE
    return hourSet;
}

//-----------------------------------------------------------------------//

//Function: TetaZ (numPoly,sigma,hour)
//Purpose: Calculate the angle difference between the sun radiation vector and the ground.
//Parameters: Polygon that you want to calculate (NumPoly) and the sun declination (sigma),
//and the current time (hour)
//Returns: Solar radiance angle [degrees]
function TetaZ (numPoly,sigma,hour){
    
    var w1 = (hour-12)*15;
    var tetaZ = ArcCosDeg(CosDeg(selections[numPoly][0].lat())*CosDeg(sigma)*CosDeg(w1)
                +SinDeg(selections[numPoly][0].lat())*SinDeg(sigma));
    return tetaZ;
}

//-----------------------------------------------------------------------//

//Function: Teta (numPoly, sigma, gama, tilt, hour)
//Purpose: Calculate the angle difference between the sun radiation vector and the roof normal vector.
//Parameters: Polygon that you want to calculate (NumPoly) and the sun declination (sigma),
//the roof orientation (gama), roof tilt value, and the current time (hour).
//Returns: Irradiance roof angle [degrees]
function Teta (numPoly, sigma, gama, tilt, hour) {

    var w1 = (hour-12)*15;     
    var w2 = w1 + 7.5;

    var teta = ArcCosDeg(SinDeg(sigma)*SinDeg(selections[numPoly][0].lat())*CosDeg(tilt)
                -SinDeg(sigma)*CosDeg(selections[numPoly][0].lat())*SinDeg(tilt)*CosDeg(gama)
                +CosDeg(sigma)*CosDeg(selections[numPoly][0].lat())*CosDeg(tilt)*CosDeg(w1)
                +CosDeg(sigma)*SinDeg(selections[numPoly][0].lat())*SinDeg(tilt)*CosDeg(gama)*CosDeg(w1)
                +CosDeg(sigma)*SinDeg(tilt)*SinDeg(gama)*SinDeg(w1));
    return teta;
}

//-----------------------------------------------------------------------//

//Function: Io (numPoly, sigma, day, hour)
//Purpose:	Calculate the extraterrestrial radiantion on a horizontal surface to be compared
//to weather data.
//Parameters: Polygon that you want to calculate (NumPoly) and the sun declination (sigma),
//and the current day and time (hour).
//Returns:	Extraterrestrial radiation on a horizontal surface [MJ/m2]
function I_o (numPoly, sigma, day, hour){
    
    var w1 = (hour-12)*15;     
    var w2 = w1 + 7.5;
    
    var Gsc = 1367;     //Solar constant [W/m^2]
    
    var io = ((12*3600/Math.PI)*Gsc*(1+0.033*CosDeg(360*day/365))
            *(CosDeg(selections[numPoly][0].lat())*CosDeg(sigma)*(SinDeg(w2)-SinDeg(w1))
            +(Math.PI*(w2-w1)/180)*SinDeg(selections[numPoly][0].lat())*SinDeg(sigma)))/1000000;
    return io;
    // Io = Extraterrestrial radiation on a horizontal surface [MJ/m2] 
}

//Function: Io (numPoly, sigma, day, hour)
//Purpose:	Calculate the diffused irradiation, which is one of the parameters
//for the total roof radiation
//to wethear data.
//Parameters: Global horizontal radiation (GHI - weather data) and extraterrestrial 
//radiation on a horizontal surface
//Returns:	Diffused radiation [MJ/m2]

function I_d (I, Io){
    
    if (I > Io) {
        var kT = 1;
    }
    else {
        var kT = I/Io;
    }
    
    if (kT <= 0.22) {
        var id =(1.0 - 0.09*kT) * I;    // Equation 2.10.1 - Page 76
    }                                       
    else if (kT > 0.22 || kT <= 0.80) {
        var id = (0.9511 - 0.1604*kT + 4.388*kT^2 - 16.638*kT^3 + 12.336*kT^4) * I;  // Equation 2.10.1 - Page 76
    }
    else if (kT > 0.8) {
        var id = 0.165;     // Equation 2.10.1 - Page 76
    }    
    
    return id;
}

//Function: Itilt (tilt, hour, sunshine, sunset, Ib, Rb, Id, I, rho_g)
//Purpose:	Calculates the total radiation on the tilted roof.
//Parameters:	Tilt Angle (tilt), currently hour (hour), sunshine and sunset times (sunshine and sunset)
//, beam radiation, ratio between horizontal and tilt roofs, diffused irradiation, GHI (wheather data), and 
// diffused ground reflectance.
//Returns:	Total irradiation on a tilted plane (time interval) 
function Itilt (tilt, hour, sunshine, sunset, Ib, Rb, Id, I, rho_g){
    
    if (tilt < 0 || tilt > 90 || hour < sunshine || hour > sunset){
        var I_Tilt = 0;         
    }
    else {
        var I_Tilt = Ib*Rb
                        +Id*((1+CosDeg(tilt))/2)
                        +I*rho_g*((1-CosDeg(tilt))/2);
    }
    return I_Tilt;
    //Total irradiation on a tilted plane (time interval)    
}

//-------------------------------COMMANDS--------------------------------//

//run the function and initialyze the map
initMap();

//run the function and initialyze the drawing tool/manager
initDrawing();

//button to import the csv containing addresses
document.getElementById("import").addEventListener('change',function(){
	
	if (window.FileReader) {
    	// FileReader is supported.
    	var reader = new FileReader();
        reader.readAsText(this.files[0]); //import the content as raw text
        
        function loadHandler(event) {
			var csv = event.target.result;
			processData(csv);
		}
     
		function processData(csv) {
			var allTextLines = csv.split(/\r\n|\n/);
			//break the data in lines
			for (var i=0; i<allTextLines.length; i++) {
				var data = allTextLines[i].split(',');
				//separate the cells
				var tarr =[];
				for (var j=0; j<data.length; j++) {
					tarr.push(data[j]);
				}
				if(tarr[0]!=''){//not empty
					csvData.push(tarr);
				}
				//console.log(tarr);
			}
			//console.log(csvData);
			//window.alert(csvData);
		}

		function errorHandler(evt) {
			if(evt.target.error.name == "NotReadableError") {
				alert("Cannot read file!");
			}
		}
		
		// Handle errors load
        reader.onload = loadHandler;
		reader.onerror = errorHandler;
		
		console.log(csvData);

    } else {
    	alert('FileReader are not supported in this browser.');
    }
	
	
}),

//create an action for the "Load Address" button
document.getElementById('load-addresses').addEventListener('click', function() {
	geocodeAddress(geocoder, map);
}),

document.getElementById('generate-output').addEventListener('click', function() {
    
    var tilt = 30;
    var I_Tilt = 0;
    var rho_g = 0.25;       //Diffuse reflectance  Reference: http://www.simulatedvision.co.uk/V&A_Chap14.pdf
    var sigma = 0;          
    var Hour_Shine = 0;
    var Hour_Set = 0;
    var teta = 0;
    var tetaZ = 0;
    var I = 0;
    var Io = 0;
    var Id = 0;
    var Rb = 0;
    var Ib = 0;
    var Itilt = 0;
    var Orient = 0;
    
    for (var i = 0; i < selections.length; i++) {
    	Orient = Orientation (i); // i = polygon number that you want to calculate
        for (var day = 1; day <= 365; day++) {
            sigma = Sigma (day);
            Hour_Shine = SunShine (i, sigma);
            Hour_Set = SunSet (i, sigma);
            for (var hour = 0; hour <= 23.5; hour = hour + 0.5){
                teta = Teta (i, sigma, Orient, tilt, hour); //Check gama
                tetaZ = TetaZ (i,sigma,hour);
                I = 50 * 1.8*10^-3;
                Io = I_o (i, sigma, day, hour);
                Id = I_d (I, Io);
                Rb = CosDeg(teta)/CosDeg(tetaZ);
                Ib = I - Id;
                Itilt = Itilt (tilt, hour, Hour_Shine, Hour_Set, Ib, Rb, Id, I, rho_g);
                I_Tilt = I_Tilt + Itilt/3.6;
            }
        }         
    }
});
