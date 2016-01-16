var almacen = {
    db: null,
    tipoHabitacion: null,
    numPersonas:    null,
    numHabitaciones:null,
    numDias:        null,
    guardarReserva: function(tipoH, numP, numH, numD){
        almacen.db = window.opendDatabase("hotelApp", "1.0", "HotelApp",2000);
        //bites
        almacen.tipoHabitacion=tipoH;
        almacen.numPersonas=numP;
        almacen.numHabitaciones=numH;
        almacen.numDias=numD;
        almacen.db.transaction(almacen.tablaReservas,almacen.error,almacen.confirmarlaReserva);
  },
  error: function(error){
      alert("Error al guardar receta: " + error.code)
  },
    tablaReservas: function(tx){//tx es el objeto que permite manejar la base de datos
        tx.executeSql('CREATE TABLE IF NOT EXITS reservas (id INTEGER PRIMARY KEY,tipoh,nump, numh, numd)');
        tx.executeSql('Insert into reservas (tipoh,nump,numh,numd) values ("' + almacen.tipoHabitacion + 
                      '","' + almacen.numPersonas + '","' + almacen.numHabitaciones + '","' +
                      almacen.numDias + '")');
    },
    confirmarlaReserva: function(){
        alert('Reservar guardada en el dispositivo, esperando conexión para sincronizacion con el servidor');
    }
    
};//MENSAJE DE ERROR AL INSERT? ID NO SE GUARDA?