var conexion = {
  estaConectado: function(){
        if (navigator.connection.type!="Connection.NONE"){
            return false;
        }
        else{
            return  true;
        }
	},  
};