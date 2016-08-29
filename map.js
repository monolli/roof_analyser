/*
Lucas Monteiro de Oliveira
E-mail:lumonoli@hotmail.com
Henrique Teixeira Oliveira
E-mail: henrique@gmail.com
Summer 2016
Project Chai Energy
*/


//Global variables
var area = [];
//var colors = ['#00aedb', '#a200ff',	'#f47835', '#d41243', '#8ec127]'];
//to change the selection colors ##not working##
var csvData = [];
var geoIndex = 0;
var geoList = [];
var map;
var selections = [];
var tilt = [0,15,30,45,60];
var c_box = [];
var outputString;


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
    	zoom: 18,
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
function geocodeAddress(geocoder,resultMap,index) {
    geocoder.geocode({'address': geoList[index]}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            //set the target coordinates and the zoom in the roof
            lat2 = results[0].geometry.location.lat();
            lng2 = results[0].geometry.location.lng();
            
            resultMap.setCenter({lat: lat2, lng: lng2});
            //set the zoom for the house image
            resultMap.setZoom(21);
            //show the address that the map is showing
            document.getElementById('address-label').innerHTML = geoList[index];
        } else {
        	//show the error message
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
		editable: true,
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
		var temp = [];
		var zero = [0,0,0,0,0];
		
		//when a new polygon is completed the checkboxes get unchecked
		document.getElementById('check1').checked = false;
		document.getElementById('check2').checked = false;
		document.getElementById('check3').checked = false;
		document.getElementById('check4').checked = false;
		document.getElementById('check5').checked = false;
		
		//if the array position is not initialyzed yet
		if(selections[geoIndex] == undefined && selections[geoIndex] == null){
			temp.push(coordinatesArray);
			selections.push(temp);
			
			temp =[];
			
			temp.push(zero);
			c_box.push(temp);
			
		}else{
			//push the infos to the arrays
			selections[geoIndex].push(coordinatesArray);
			c_box[geoIndex].push(zero);
		}
		
		//console.log(c_box[geoIndex]);
		console.log(c_box);
		//window.alert(selections);
		// change the fill colour
        calc_area();
		//window.alert(coordinatesArray[1].lat());
		//window.alert(area);
	});	
}

//-----------------------------------------------------------------------//

//Function: calc_area()
//Purpose:	calc and store the area of every polygon
//Parameters:	none
//Returns:	nothing

function calc_area(){
	
	//if the array is not initialyzed yet
	if(area[geoIndex] == undefined && area[geoIndex] == null){
			var temp = [];
			temp.push(google.maps.geometry.spherical.computeArea(selections[geoIndex][selections[geoIndex].length-1]));
			area.push(temp);
		}else{
			//store the infos in the array
			area[geoIndex].push(google.maps.geometry.spherical.computeArea(selections[geoIndex][selections[geoIndex].length-1]));
		}	
    
	
	//window.alert(google.maps.geometry.spherical.computeArea(selections[selections.length-1]));
	//area[geoIndex].push(google.maps.geometry.spherical.computeArea(selections[selections.length-1]));
	//window.alert(area);
	//console.log(area);
    //console.log(selections[0][0].length);
    //console.log(geoList.length);
    //console.log(tilt.length);
    //console.log(selections[geoIndex].length-1);
    //console.log(selections.length-1);
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
function Orientation (numGeo,numPoly) {
    
    var numPoints = selections[numGeo][numPoly].length;
    
    var deltaLat = selections[numGeo][numPoly][0].lat() - selections[numGeo][numPoly][1].lat();   
    // Difference between the latitude of two points at the same height.
    var deltaLng = selections[numGeo][numPoly][0].lng() - selections[numGeo][numPoly][1].lng();      
    // Difference between the longitude of two points at the same height.
    
    // To get the point that represents the opositive side of the roof orientation.
    if (numPoints === 3 || numPoints === 4) {
        var midLat = selections[numGeo][numPoly][2].lat();
        var midLng = selections[numGeo][numPoly][2].lng(); 
    }
    else if (numPoints % 2 === 1) {    // lenght is odd
        var midLat = selections[numGeo][numPoly][numPoints/2 + 0.5].lat();
        var midLng = selections[numGeo][numPoly][numPoints/2 + 0.5].lng(); 
    }
    else {                              // lenght is even
        var midLat = selections[numGeo][numPoly][numPoints/2].lat();
        var midLng = selections[numGeo][numPoly][numPoints/2].lng(); 
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
        var inter = selections[numGeo][numPoly][0].lat() - slope*selections[numGeo][numPoly][0].lng();      
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
        
        if (midLat > selections[numGeo][numPoly][0].lat()) {      
            // South Orientation -> Azimuth Angle = 0 degrees
            var orient = 0;
        }
        else if (midLat < selections[numGeo][numPoly][0].lat()) {
            // North Orientation -> Azimuth Angle = 180 degrees
            var orient = 180;
        }        
    }
    
    else if (slopeAngle === 0){
        
        if (midLng > selections[numGeo][numPoly][0].lng()) {      
            // West Orientation -> Azimuth Angle = 90 degrees
            var orient = 90;
        }
        else if (midLng < selections[numGeo][numPoly][0].lng()) { 
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
                    -0.399912*Math.cos(B)+0.070257*Math.sin(B)
                    -0.006758*Math.cos(2*B)+0.000907*Math.sin(2*B)
                    -0.002697*Math.cos(3*B)+0.00148*Math.sin(3*B)); 
    return sigma;
}

//Reference: J. A. Duffie and W. A. Beckman (2013) "Solar Engineering of Thermal Processes." Fourth Edition, page 9, equation 1.4.2
//Reference: J. A. Duffie and W. A. Beckman (2013) "Solar Engineering of Thermal Processes." Fourth Edition, page 14, equation 1.6.1b

//-----------------------------------------------------------------------//

//Function: SunShine (numPoly, sigma)
//Purpose: Calculate the sunset hour.
//Parameters: Polygon that you want to calculate (NumPoly) and the sun declination
//Returns: Sunset hour [h]
function SunShine (numGeo,numPoly, sigma) {
    var wShine = -ArcCosDeg(-TanDeg(selections[numGeo][numPoly][0].lat())*TanDeg(sigma));
    // Sunshine hour angle [degrees]
    var hourShine = 12 + wShine/15;                             
    // Sunshine hour [hour]
    return hourShine;                    
}

//Reference: J. A. Duffie and W. A. Beckman (2013) "Solar Engineering of Thermal Processes." Fourth Edition, page 17, equation 1.6.10

//-----------------------------------------------------------------------//

//Function: SunSet (numPoly, sigma)
//Purpose: Calculate the sunset hour.
//Parameters: Polygon that you want to calculate (NumPoly) and the sun declination (sigma)
//Returns: Sunset hour [h]
function SunSet (numGeo,numPoly, sigma){
    var wSet = ArcCosDeg(-TanDeg(selections[numGeo][numPoly][0].lat())*TanDeg(sigma));      
    // Sunset hour angle [degrees]  
    var hourSet = 12 + wSet/15;                                   
    // Sunset hour [hour]   WARNING: THE VALUE OF wSET is NEGATIVE
    return hourSet;
}

//Reference: J. A. Duffie and W. A. Beckman (2013) "Solar Engineering of Thermal Processes." Fourth Edition, page 17, equation 1.6.10

//-----------------------------------------------------------------------//

//Function: TetaZ (numPoly,sigma,hour)
//Purpose: Calculate the angle difference between the sun radiation vector and the ground.
//Parameters: Polygon that you want to calculate (NumPoly) and the sun declination (sigma),
//and the current time (hour)
//Returns: Solar radiance angle [degrees]
function TetaZ (numGeo,numPoly,sigma,hour){
    
    var w1 = (hour-12)*15;
    var tetaZ = ArcCosDeg(CosDeg(selections[numGeo][numPoly][0].lat())*CosDeg(sigma)*CosDeg(w1)
                +SinDeg(selections[numGeo][numPoly][0].lat())*SinDeg(sigma));
    return tetaZ;
}

//Reference: J. A. Duffie and W. A. Beckman (2013) "Solar Engineering of Thermal Processes." Fourth Edition, page 15, equation 1.6.5

//-----------------------------------------------------------------------//

//Function: Teta (numPoly, sigma, gama, tilt, hour)
//Purpose: Calculate the angle difference between the sun radiation vector and the roof normal vector.
//Parameters: Polygon that you want to calculate (NumPoly) and the sun declination (sigma),
//the roof orientation (gama), roof tilt value, and the current time (hour).
//Returns: Irradiance roof angle [degrees]
function Teta (numGeo, numPoly, numTilt, sigma, gama, hour) {

    var w1 = (hour-12)*15;     
    var w2 = w1 + 7.5;

    var teta = ArcCosDeg(SinDeg(sigma)*SinDeg(selections[numGeo][numPoly][0].lat())*CosDeg(tilt[numTilt])
                -SinDeg(sigma)*CosDeg(selections[numGeo][numPoly][0].lat())*SinDeg(tilt[numTilt])*CosDeg(gama)
                +CosDeg(sigma)*CosDeg(selections[numGeo][numPoly][0].lat())*CosDeg(tilt[numTilt])*CosDeg(w1)
                +CosDeg(sigma)*SinDeg(selections[numGeo][numPoly][0].lat())*SinDeg(tilt[numTilt])*CosDeg(gama)*CosDeg(w1)
                +CosDeg(sigma)*SinDeg(tilt[numTilt])*SinDeg(gama)*SinDeg(w1));
    return teta;
}

//Reference: J. A. Duffie and W. A. Beckman (2013) "Solar Engineering of Thermal Processes." Fourth Edition, page 14, equation 1.6.2

//-----------------------------------------------------------------------//

//Function: Io (numPoly, sigma, day, hour)
//Purpose:	Calculate the extraterrestrial radiantion on a horizontal surface to be compared
//to weather data.
//Parameters: Polygon that you want to calculate (NumPoly) and the sun declination (sigma),
//and the current day and time (hour).
//Returns:	Extraterrestrial radiation on a horizontal surface [MJ/m2]
function I_o (numGeo,numPoly, sigma, day, hour){
    
    var w1 = (hour-12)*15;     
    var w2 = w1 + 7.5;
    
    var Gsc = 1367;     //Solar constant [W/m^2]
    
    var io = ((12*3600/Math.PI)*Gsc*(1+0.033*CosDeg(360*day/365))
            *(CosDeg(selections[numGeo][numPoly][0].lat())*CosDeg(sigma)*(SinDeg(w2)-SinDeg(w1))
            +(Math.PI*(w2-w1)/180)*SinDeg(selections[numGeo][numPoly][0].lat())*SinDeg(sigma)))/1000000;
    return io;
    // Io = Extraterrestrial radiation on a horizontal surface [MJ/m2] 
}

//Reference: J. A. Duffie and W. A. Beckman (2013) "Solar Engineering of Thermal Processes." Fourth Edition, page 40, equation 1.10.4

//-----------------------------------------------------------------------//

//Function: I_d (I, Io)
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
        var id = (0.9511 - 0.1604*kT + 4.388*Math.pow(kT,2) - 16.638*Math.pow(kT,3) + 12.336*Math.pow(kT,4)) * I;  // Equation 2.10.1 - Page 76
    }
    else if (kT > 0.8) {
        var id = 0.165;     // Equation 2.10.1 - Page 76
    }    
    
    return id;
}

//Reference: J. A. Duffie and W. A. Beckman (2013) "Solar Engineering of Thermal Processes." Fourth Edition, page 76, equation 2.10.1

//-----------------------------------------------------------------------//

//Function: I_data ()
//Purpose:	Create the an array with the nearest weather database
//Parameters: None 
//Returns:	An global horizontal irradiation array [w/m²] and the weather database locations
function I_data () {
    
    var I = [];         // GHI [w/m²]
    var temp = [];      // Temporary array 
    var Location = [];  // String with location
    var i = 0;          // Excel line
    var j = 0;          // Excel Column
    var dist = 0;       // Calculated distance
    var distMin = 0     // Min distance 
    var index = 0;      // The column where the nearest database was found
    
    for (var g = 0; g < geoList.length; g++) {  // Find for each house 
        
        if (selections[g]!= undefined){         // Does not run if the selection does not exist
            while ( (j+1) < csvData[3].length) {
                dist = Math.pow(Math.pow(csvData[3][1+j]-selections[g][0][0].lat(),2)+ 
                                Math.pow(csvData[4][1+j]-selections[g][0][0].lng(),2),0.5);
                                //Distance between two points (Pythagorean theorem)
                if (j == 0){
                    distMin = dist;     // distMin starts with first distance value           
                }
                if (dist < distMin){    // Change the min distance if the new value is lower than the previous
                    distMin = dist;
                    index = j;          // Columnm where the database is in the spreadsheet
                }
                j = j + 1   // Go to the next column in the spreadsheet
            }
            for (i = 0; i < 17519; i++) {   
                temp[i] = parseInt(csvData[6+i][1+index]);  
                // Create the temporary vector with the weather data
            }
            I.push(temp);                       // Global irradiation vector
            Location [g] = csvData[2][1+index];     // Location address in the spreadsheet
            j = 0;      // Reinicialization of j for a new house 
        }
    }
    return [I, Location];  // Returns the Irradiation array and an array with the weather database locations
}

// HOW TO UPDATE THE WEATHER DATABASE:
// 1. Launch the NSRDB Viewer at https://nsrdb.nrel.gov/nsrdb-viewer
// 2. Find in the World Map the place that you want to have the data
// 3. In the top of the page, you should se the option "Download Data"
// 4. In this option, click in the dot icon in the option "NSRDB Data Download (Point)"
// 5. Give the following information and click "Continue"
//          Full Name:
//          Organization/Affiliation:
//          Planned Use:
//          Email:
// 6. Click in the option "PSM"
// 7. For the macro runs properly, you should select 2010, 2011, 2012, 2013, 2014 and JUST select the option GHI in the "Select Attibutes" subtopic. Regarding to the "Select Attributes" all the checkbox remain the same.
// 8. The data will me send to the regitered e-mail address as a ZIP file.
// 9. After downloading the data it is necessary to unzip the entire folder
// 10. Open the macro spreadsheet (nrel_database.xlsm) 
// 11. For running the macro, you should go to the "weather_calculation" sheet and click at the "Execute" button.
// 12. It will request you to select the folder that contains the data that you want to update.
// 13. It will take about 5 seconds to update the data in the "whether_data" sheet.
// 14. To keep the program organized, you should go the last column of the wether_data and write where the data that was calculated came from.
// 15. Finally, with the first sheet (WEATHER_DATA) open SAVE AS a CSV file. (It is important to have to have your first sheet open, since a CSV file cannot have more than one sheet in its format.

//-----------------------------------------------------------------------//

//Function: Itilt (tilt, hour, sunshine, sunset, Ib, Rb, Id, I, rho_g)
//Purpose:	Calculates the total radiation on the tilted roof.
//Parameters:	Tilt Angle (tilt), currently hour (hour), sunshine and sunset times (sunshine and sunset)
//, beam radiation, ratio between horizontal and tilt roofs, diffused irradiation, GHI (wheather data), and 
// diffused ground reflectance.
//Returns:	Total irradiation on a tilted plane (time interval) 
function Itilt (numTilt, hour, sunshine, sunset, Ib, Rb, Id, I, rho_g){
    
    if (tilt[numTilt] < 0 || tilt[numTilt] > 90 || hour < sunshine || hour > sunset){
        var I_Tilt = 0;         // Conditions where there is no sun in the surface
    }
    else {
        var I_Tilt = Ib*Rb
                      +Id*((1+CosDeg(tilt[numTilt]))/2)
                      +I*rho_g*((1-CosDeg(tilt[numTilt]))/2);   
        //Equation to calculate the total irradiation in a tilted plane.
    }
    return I_Tilt;
    //Total irradiation on a tilted plane (time interval)    
}

// Reference: J. A. Duffie and W. A. Beckman (2013) "Solar Engineering of Thermal Processes." Fourth Edition, page 90, equation 2.15.2.

//-------------------------------COMMANDS--------------------------------//

//run the function and initialyze the map
initMap();

//run the function and initialyze the drawing tool/manager
initDrawing();

//button to import the csv containing GHI Data
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
			//alert error
			if(evt.target.error.name == "NotReadableError") {
				alert("Cannot read file!");
			}
		}
		
		// Handle errors load
        reader.onload = loadHandler;
		reader.onerror = errorHandler;
		
		//console.log(csvData);

    } else {
    	//alert error
    	alert('FileReader are not supported in this browser.');
    }
	
	
}),

//button to import the csv containing address data
//.CSV file must be a column with onde address per line
document.getElementById("importAddress").addEventListener('change',function(){
	
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
				if(allTextLines[i]!=''){//not empty
					geoList.push(allTextLines[i]);
				}
			}
		}
			//console.log(geoList);
			//window.alert(geoList);

		function errorHandler(evt) {
			if(evt.target.error.name == "NotReadableError") {
				alert("Cannot read file!");
			}
		}
		
		// Handle errors load
    	reader.onload = loadHandler;
		reader.onerror = errorHandler;
		
		//console.log(geoList);
		
    } else {
    	alert('FileReader are not supported in this browser.');
    }
	
}),

//create an action for the "Load Address" button
document.getElementById('load-addresses').addEventListener('click', function() {
	var address = document.getElementById('address_text_area').value;
	//get the value from the array
	if(address != ""){
		var data = address.split(',');
		//separate the address
		for (var j=0; j<data.length; j++) {
			if(data[j]!=''){//not empty
				geoList.push(data[j]);
			}
		}
	}
	//clear the address_text_area
	document.getElementById('address_text_area').value = "";
	if(document.getElementById('address-label').innerHTML == "No Address Selected"){
			geocodeAddress(geocoder, map, geoIndex);
			//load the first address
	}
	//console.log(geoList);
}),

document.getElementById('prev-address').addEventListener('click', function (){
	if(geoList.length == 0){
		alert('Load the addresses first.');
	}
	else if(geoIndex == 0){
		alert('This is the first position.');
	}else{
		geoIndex =geoIndex - 1;
		geocodeAddress(geocoder, map, geoIndex);
	}
});

document.addEventListener('keyup', function(event) {
  if (event.keyCode == 17) {	//javascript code for (ctrl)
    if(geoList.length == 0){
		alert('Load the addresses first.');
	}
	else if(geoIndex == 0){
		alert('This is the first position.');
	}else{
		geoIndex =geoIndex - 1;
		geocodeAddress(geocoder, map, geoIndex);
	}
  }
});

document.addEventListener('keyup', function(event) {
  if (event.keyCode == 18) {	//javascript code for (alt)
    if(geoList.length == 0){
		alert('Load the addresses first.');
	}
	else if(geoIndex == geoList.length-1){
		alert('This is the last position.');
	}else{
		geoIndex =geoIndex + 1;
		geocodeAddress(geocoder, map, geoIndex);
	}
  }
});

document.getElementById('next-address').addEventListener('click', function (){
	if(geoList.length == 0){
		alert('Load the addresses first.');
	}
	else if(geoIndex == geoList.length-1){
		alert('This is the last position.');
	}else{
		geoIndex =geoIndex + 1;
		geocodeAddress(geocoder, map, geoIndex);
	}
});

document.getElementById('check1').addEventListener('click', function() {
	if(selections[geoIndex] == undefined){
		alert("You don't have a selection yet.");
	}else if(document.getElementById('check1').checked == true){
		c_box[geoIndex][selections[geoIndex].length-1][0] = 1;
		//console.log("checked");
		//console.log(c_box[geoIndex][selections[geoIndex].length-1]);
	}else{
		c_box[geoIndex][selections[geoIndex].length-1][0] = 0;
		//console.log("unchecked");
		//console.log(c_box[geoIndex][selections[geoIndex].length-1]);
	}
});

document.getElementById('check2').addEventListener('click', function() {
	if(selections[geoIndex] == undefined){
		alert("You don't have a selection yet.");
	}else if(document.getElementById('check2').checked == true){
		c_box[geoIndex][selections[geoIndex].length-1][1] = 1;
		//console.log("checked");
		//console.log(c_box[geoIndex][selections[geoIndex].length-1]);
	}else{
		c_box[geoIndex][selections[geoIndex].length-1][1] = 0;
		//console.log("unchecked");
		//console.log(c_box[geoIndex][selections[geoIndex].length-1]);
	}
});

document.getElementById('check3').addEventListener('click', function() {
	if(selections[geoIndex] == undefined){
		alert("You don't have a selection yet.");
	}else if(document.getElementById('check3').checked == true){
		c_box[geoIndex][selections[geoIndex].length-1][2] = 1;
		//console.log("checked");
		//console.log(c_box[geoIndex][selections[geoIndex].length-1]);
	}else{
		c_box[geoIndex][selections[geoIndex].length-1][2] = 0;
		//console.log("unchecked");
		//console.log(c_box[geoIndex][selections[geoIndex].length-1]);
	}
});

document.getElementById('check4').addEventListener('click', function() {
	if(selections[geoIndex] == undefined){
		alert("You don't have a selection yet.");
	}else if(document.getElementById('check4').checked == true){
		c_box[geoIndex][selections[geoIndex].length-1][3] = 1;
		//console.log("checked");
		//console.log(c_box[geoIndex][selections[geoIndex].length-1]);
	}else{
		c_box[geoIndex][selections[geoIndex].length-1][3] = 0;
		//console.log("unchecked");
		//console.log(c_box[geoIndex][selections[geoIndex].length-1]);
	}
});

document.getElementById('check5').addEventListener('click', function() {
	if(selections[geoIndex] == undefined){
		alert("You don't have a selection yet.");
	}else if(document.getElementById('check5').checked == true){
		c_box[geoIndex][selections[geoIndex].length-1][4] = 1;
		//console.log("checked");
		//console.log(c_box[geoIndex][selections[geoIndex].length-1]);
	}else{
		c_box[geoIndex][selections[geoIndex].length-1][4] = 0;
		//console.log("unchecked");
		//console.log(c_box[geoIndex][selections[geoIndex].length-1]);
	}
});

document.getElementById('generate-output').addEventListener('click', function() {
    
    var Orient = 0;         // Roof Orientation
    var sigma = 0;          // Sun`s declination
    var Hour_Shine = 0;     // Sunshine hour
    var Hour_Set = 0;       // Sunset hour
    var teta = 0;           // Angle between the sun vector and the tilted roof orientation
    var tetaZ = 0;          // Angle between the sun vector and a horizontal surface
    var Io = 0;             // Extraterrestrial radiantion on a horizontal surface
    var Id = 0;             // Diffused radiation
    var Rb = 0;             // Ratio between the horizontal and tilted surfaces
    var Ib = 0;             // Beam Irradiation for a hour
    var rho_g = 0.25;       // Diffuse Reflectance Reference - http://www.simulatedvision.co.uk/V&A_Chap14.pdf
    var I_inter = 0;        // Total Irradiation - Half hour fraction 
    var I = 0;              // Weather data
    var Location = [];      // Location string 
    
    var Idata = [[]];       // Weather data
    
    var I_Tilt = 0;         // Total irradiation for each angle 
    var E_Tilt = 0;         // Total energy for each angle
    var I_Surface = [];     // Total irradiaton for each surface
    var E_Surface = [];     // Total energy for each surface
    var I_Geo = [];         // Total irradiation for each house
    var E_Geo = [];         // Total energy for each house
    
    var I_temp1 = [];       // Temporary vector to avoid bugs
    var E_temp1 = [];       // Temporary vector to avoid bugs
    var I_temp2 = [];       // Temporary vector to avoid bugs
    var E_temp2 = [];       // Temporary vector to avoid bugs

    [Idata, Location] = I_data();      // Create the weather array and find the source location
    
    for (var g = 0; g < geoList.length; g++ ) {     //Runs for all the houses
    	if( selections[g] != undefined ){           //Have at least one selection
			for (var s = 0; s < selections[g].length; s++) {     //Runs for all selections
		        Orient = Orientation (g, s);          // Polygon orientation for one of the "g" house surfaces
		        for (var t = 0; t < tilt.length; t++) {   // Runs for all the possible selected tilts
                    if (c_box[g][s][t] == 0){
                        I_Tilt = 0;
                        E_Tilt = 0;
                    }
                    else{
                        for (var day = 1; day <= 365; day++) {    // Runs for the entire year
                            sigma = Sigma (day);                  // Sun's declination 
                            Hour_Shine = SunShine (g, s, sigma);  // SunShine
                            Hour_Set = SunSet (g, s, sigma);      //SunSet
                            for (var hour = 0; hour <= 23.5; hour = hour + 0.5){  //Runs for each half an hour
                                teta = Teta (g, s, t, sigma, Orient, hour);       
                                tetaZ = TetaZ (g, s, sigma, hour);                
                                I = Idata[g][(hour/0.5)+(day-1)*(24/0.5)]  * 0.0018; //multiplies for 0.0018 to convert from w/m² to MJ/m² for a half an hour and use in the I_inter formula
                                Io = I_o (g, s, sigma, day, hour);
                                Id = I_d (I, Io);
                                Rb = CosDeg(teta)/CosDeg(tetaZ);
                                Ib = I - Id;      // Irradiation beam it just the difference between GHI and the diffused irradiation
                                I_inter = Itilt (t, hour, Hour_Shine, Hour_Set, Ib, Rb, Id, I, rho_g)/3.6;
                                I_Tilt = I_Tilt + I_inter;
                                E_Tilt = E_Tilt + (I_inter/CosDeg(tilt[t]))*area[g][s];   // To calculate the energy it is necessary to calculate: energy x  projected area. Since we have the flat area its need to be converted to projected area -> Aproj = Aflat/cos(tilt). It means that the highers angles will have greaters areas.
                            }
		                }
		            }
				    I_temp1[t] = I_Tilt;
				    E_temp1[t] = E_Tilt;
				    I_Tilt = 0;     //  Restart for the next angle
				    E_Tilt = 0;     //  Restart for the next angle
		        }
				I_Surface.push (I_temp1);
				E_Surface.push (E_temp1);
				I_temp2[s] = I_Surface[s];  // Restart for the next surface
				E_temp2[s] = E_Surface[s];  // Restart for the next surface
				I_temp1 = [];
				E_temp1 = [];
		    }
			I_Geo.push (I_temp2);
			E_Geo.push (E_temp2);
			I_Surface = [];  // Restart for the next house
			E_Surface = [];  // Restart for the next house
			I_temp2 = [];    // Restart for the next house 
			E_temp2 = [];    // Restart for the next house
    	}
    }
    
    var min_Tilt = 100000000000;    
    // An unrealistic high value to start as min_Tilt, which mean that 
    // any realistic number will be lower than value
    var max_Tilt = 0;
    // An unrealistic low value to start as max_Tilt, which mean that 
    // any realistic number will be greater than value
    var Sum_min = [];   // min Energy/m² sum of the house
    var Sum_max = [];   // min Energy/m² sum of the house
    var angle_selec_min = [];   //min Energy/m² angles for each surface
    var angle_selec_max = [];   //max Energy/m² angles for each surface
    var angles_min = [];    //min Energy/m² angles for each house [all the surfaces]
    var angles_max = [];    //max Energy/m² angles for each house [all the surfaces]
    
    var coef = 0.75     
    // coeficient of how much roof area will be considered in the number of panels calculations
    var Area_panel = 6; // 2x3 solar panel
    // Panel area
    var Num_panels = []
    // Array to store the number of panels for each selection
    var Num_panels_house = []
    // Array to store the number of panels for each house [all the surfaces]
    
    // Output the max and min values with the selected roof tilts 
    
    for (g = 0; g < geoList.length; g++ ) {         //Runs for all the houses
        Sum_min[g] = 0;     // Sum_min inicialization
        Sum_max[g] = 0;     // Sum_max inicialization
        
        if(selections[g] != undefined){
        	for (s = 0; s < selections[g].length; s++) {    //Runs for all selections
		        min_Tilt = 100000000000;
		        max_Tilt = 0;
		        for (t = 0; t < tilt.length; t++){              //Runs for all the tilts
		            if (I_Geo[g][s][t] < min_Tilt && I_Geo[g][s][t] != 0)  {    
		                // Found a new min energy value for the face tilt. 
		                min_Tilt = I_Geo[g][s][t];
		                // Stores the tilt angle of the roof face that is capable to generate less energy
		                angle_selec_min[s] = tilt[t];
		            }
		            if (I_Geo[g][s][t] > max_Tilt) {
		                // Found a new max energy value for the face tilt.
		                max_Tilt = I_Geo[g][s][t];
		                // Stores the tilt angle of the roof face that is capable to generate more energy
		                angle_selec_max[s] = tilt[t];
		            }
		        }
		        if (min_Tilt == 100000000000 && max_Tilt == 0) {  
		            // None of the checkboxes were selected
		            // Since no roof tilted was selected, energy will be equals to 0
		            // and the min and max angle will be equal to -1 (negative value),
		            // to represent that no angle was selected.
		            min_Tilt = 0;
		            angle_selec_min[s] = -1;
		            max_Tilt = 0 ;
		            angle_selec_max[s] = -1;
		        }  
		        // Sum all the roof faces with min energy values
		        Sum_min[g] = Sum_min[g] + min_Tilt;
		        // Sum all the roof faces with max energy value
		        Sum_max[g] = Sum_max[g] + max_Tilt;
		        // Calculates the number os panels for each selection
		        Num_panels[s] = area[g][s]*coef/Area_panel;
        	} 
        }
        
        // Creates an array to stores the min angles values for all selections
        angles_min.push(angle_selec_min);
        // Creates an array to stores the max angles values for all selections
        angles_max.push(angle_selec_max); 
        // Stores the number of panels for each surface of each house
        Num_panels_house.push(Num_panels);
        // Restart for the next house
        angle_selec_min = [];
        // Restart for the next house
        angle_selec_max = [];
        // Restart for the next house
        Num_panels = [];
    }
    
    //prepare the JSON array
    
    var outputJSON = {};
    
    outputJSON["address"] = geoList;
    outputJSON["selections"] =  selections;
    outputJSON["area"] = area;
    outputJSON["energy/m2"] = I_Geo;
    outputJSON["total_energy"] = E_Geo;
    outputJSON["checkbox"] = c_box;
    outputJSON["weather_database"] = Location;
    outputJSON["number_of_panels"] = Num_panels_house;
    //number os panels
    
    
    outputString = JSON.stringify(outputJSON);
    
    // console.log(outputJSON);
    //   console.log(outputString);
    
    
    //the code below is an example
    
    /*
    var numFace = 0;
    
    console.log('Results: ');                   //CONSOLE RESULTS OUTPUT
    for (g = 0; g < geoList.length; g++) {
    	if(selections[g] != undefined){
			console.log('Address: ' + geoList[g]);
		        for (s = 0; s < selections[g].length; s++){
		            numFace = s + 1;
		            console.log('   Roof face ' + numFace + ": ");
		            for (t = 0; t < tilt.length; t++) {
		                console.log('       ' + tilt[t] + ' Degrees: '  +E_Geo[g][s][t].toFixed(2) + ' kWh');
		            }
		        }
		    console.log('------------------------');
    	}
        console.log('Weather database location: ' + Location[g]);
    }
    */
});
