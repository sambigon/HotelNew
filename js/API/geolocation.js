var geolocation = {
    latitud:null,
    longitud:null,
    
    error: function(error){
    alert("error:" + error.message);
    },
    exito: function(position){
        alert(position);
        geolocation.latitud=position.coords.latitude;
        geolocation.longitud=position.coords.longitude;
        
        var latYLong = new google.maps.LatLng(geolocation.latitud,geolocation.longitud);
        //alert('125');
        var opciones={
            zoom: 13,
            center: latYLong,
            mapTypeId: google.maps.MapTypeId.ROADMAP            
        };
        //alert('126');
        var map = new google.maps.Map(document.getElementById('canvas'), opciones);
        var marker = new google.maps.Marker({
           position: latYLong,
           map: map,
           title: "Mi ubicacion"
        });
    },
    getPosition:function(){
        alert("getPosition");
        navigator.geolocation.getCurrentPosition(geolocation.exito,geolocation.error);
        //navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });

    }
}