//heavy work here
(function (window,google){
  
  var Mapster = (function(){
    //create a map
    function Mapster(element,opts){
      this.gMap = new google.maps.Map(element,opts);
    }
    
    //other custom functions
    Mapster.prototype = {
      
      //map center get/set
      
      center: function(opts){
        opts.center = {
          lat: opts.lat,
          lng: opts.lng
        };
        if(opts){
          this.gMap.setCenter(opts);
        }else{
          return this.gMap.getCenter();
        }
      },
      
      //zoom get/set
      zoom: function(level){
        if(level){
          this.gMap.setZoom(level);
        }else{
          return this.gMap.getZoom();
        }
      },
      //event handler
      _on: function(event,callback){
        var self = this;
        google.maps.event.addListener(this.gMap,event,function(e){
          callback.call(self,e);
        });
      },
      
      addMarker: function(opts){
        opts.position = {
          lat: opts.lat,
          lng: opts.lng
        };
        this._createMarker(opts);
      },
      
      _createMarker:function(opts){
        opts.map = this.gMap;
        return new google.maps.Marker(opts);
      },
      
    };
    return Mapster;
  }());
  //map creator
  Mapster.create = function(element,opts) {
    return new Mapster(element, opts);
  };
  
  window.Mapster = Mapster;
  
  
}(window,google));
