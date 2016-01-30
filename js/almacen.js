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
        tx.executeSql('CREATE TABLE IF NOT EXISTS reservas_pendientes (id INTEGER PRIMARY KEY,tipoh,nump, numh, numd)');
        tx.executeSql('Insert into reservas_pendientes (tipoh,nump,numh,numd) values ("' + almacen.tipoHabitacion + '","' + almacen.numPersonas + '","' + almacen.numHabitaciones + '","' + almacen.numDias + '")');
    },
    confirmarlaReserva: function(){
        alert('Reservar guardada en el dispositivo, esperando conexión para sincronizacion con el servidor');
    },
    agregarHistorial(th,np,nh,nd){
        almacen.db = window.opendDatabase("hotelApp", "1.0", "HotelApp",2000);
        almacen.tipoHabitacion=th;
        almacen.numPersonas=np;
        almacen.numHabitaciones=nh;
        almacen.numDias=nd;
        almacen.db.transaction(almacen.tablaHistorial,almacen.error,almacen.confirmarHistorial);
        //almacen.db.transaction(metodo, mensaje error, mensaje de confimracion;
    },
    tablaHistorial: function(tx){
        tx.executeSql('CREATE TABLE IF NOT EXISTS historial (id INTEGER PRIMARY KEY,tipoh,nump, numh, numd)');
        tx.executeSql('Insert into historial (tipoh,nump,numh,numd) values ("' + almacen.tipoHabitacion + '","' + almacen.numPersonas + '","' + almacen.numHabitaciones + '","' + almacen.numDias + '")');
    },
    confirmarHistorial: function(){
        alert("Reserva guardada en el historial");
    },
    leerPendientes: function(){
        almacen.db = window.opendDatabase("hotelApp", "1.0", "HotelApp",2000);
        almacen.db.transaction(almacen.enviarPendientes,almacen.error,almacen.confirmarPendientes);
    },
    enviarPendientes: function(tx){
        tx.executeSql("Select * from reservas_pendientes",[],function(tx,resultados){
            var cantidad = resultados.rows.length;
            if (cantidad>0){
                for(var i=0; i<cantidad; i++){
                    var th = resultados.rows.item(i).tipoh;
                    var np = resultados.rows.item(i).nump;
                    var nh = resultados.rows.item(i).numh;
                    var nd = resultados.rows.item(i).numd;
                    fn.enviarReservas(th,np,nh,nd);
                    tx.executeSql("Delete from reservas_pendientes where id="+ resultados.rows.item(i).id);
                }
            }
        });
    },
    confirmarPendientes: function(tx){
        alert("Sincronizado correctamente con el servidor");
    },
    

};//MENSAJE DE ERROR AL INSERT? ID NO SE GUARDA?