var geolocation = {
    latitud:null,
    longitud:null,
    
    error: function(error){
    alert("error:" + error.message);
    },
    exito: function(position){
        //alert(position);
        geolocation.latitud=position.coords.latitude;
        geolocation.longitud=position.coords.longitude;
        
        var latYLong = new google.maps.LatLng(geolocation.latitud,geolocation.longitud);
    
        var hotel = {lat: 19.0631136, lng: -98.2203158};

        //alert('125');
        var opciones={
            zoom: 13,
            center: latYLong,
            mapTypeId: google.maps.MapTypeId.ROADMAP            
        };
        var map = new google.maps.Map(document.getElementById('canvas'), opciones);
        //alert('126');
        /*
        var marker = new google.maps.Marker({
           position: latYLong,
           map: map,
           title: "Mi ubicacion"
        });*/
        
        
         var directionsDisplay = new google.maps.DirectionsRenderer({
            map: map
          });

          // Set destination, origin and travel mode.
          var request = {
            destination: hotel,
            origin: latYLong,
            travelMode: google.maps.TravelMode.DRIVING
          };

          // Pass the directions request to the directions service.
          var directionsService = new google.maps.DirectionsService();
          directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              // Display the route on the map.
              directionsDisplay.setDirections(response);
            }
          });
        
        
    },
    getPosition:function(){
        //alert("getPosition");
        navigator.geolocation.getCurrentPosition(geolocation.exito,geolocation.error);
        //navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });

    }
}