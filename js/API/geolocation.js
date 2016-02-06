var geolocation = {
    latitud:null,
    longitud:null,
    
    error: function(error){
    alert("error:" + error.message);
    },
    exito: function(position){
        geolocation.latitud=position.coords.latitude;
        geolocation.longitud=position.coords.longitude;
    },
    getPosition:function(){
        alert("getPosition");
        navigator.geolocation.getCurrentPosition(geolocation.exito,geolocation.error);
    }
    
}