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
    },
    getPosition:function(){
        alert("getPosition");
        navigator.geolocation.getCurrentPosition(geolocation.exito,geolocation.error);
        //navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });

    }
}