var almacen = {
    db: null,
    tipoHabitacion: null,
    numPersonas:    null,
    numHabitaciones:null,
    numDias:        null,
    guardarReserva: function(tipoH, numP, numH, numD){
        almacen.db = window.openDatabase("hotelApp", "1.0", "HotelApp",2000);
        //bites
        almacen.tipoHabitacion=tipoH;
        almacen.numPersonas=numP;
        almacen.numHabitaciones=numH;
        almacen.numDias=numD;
        almacen.db.transaction(almacen.tablaReservas,almacen.error,almacen.confirmarlaReserva);
  },
  error: function(error){
      alert("Error al guardar reserva: " + error.message)
  },
    tablaReservas: function(tx){//tx es el objeto que permite manejar la base de datos
        tx.executeSql('CREATE TABLE IF NOT EXISTS reservas_pendientes (id INTEGER PRIMARY KEY,tipoh,nump, numh, numd)');
        tx.executeSql('INSERT INTO reservas_pendientes (tipoh,nump,numh,numd) values ("' + almacen.tipoHabitacion + '","' + almacen.numPersonas + '","' + almacen.numHabitaciones + '","' + almacen.numDias + '")');
    },
    confirmarlaReserva: function(){
        alert('Reservar guardada en el dispositivo, esperando conexión para sincronizacion con el servidor');
    },
    agregarHistorial: function(th,np,nh,nd){
        almacen.db = window.openDatabase("hotelApp", "1.0", "HotelApp",2000);
        almacen.tipoHabitacion=th;
        almacen.numPersonas=np;
        almacen.numHabitaciones=nh;
        almacen.numDias=nd;
        almacen.db.transaction(almacen.tablaHistorial,almacen.error,almacen.confirmarHistorial);
        //almacen.db.transaction(metodo, mensaje error, mensaje de confimracion;
    },
    tablaHistorial: function(tx){
        tx.executeSql('CREATE TABLE IF NOT EXISTS historial (id INTEGER PRIMARY KEY,tipoh,nump, numh, numd)');
        tx.executeSql('INSERT INTO historial (tipoh,nump,numh,numd) values ("' + almacen.tipoHabitacion + '","' + almacen.numPersonas + '","' + almacen.numHabitaciones + '","' + almacen.numDias + '")');
    },
    confirmarHistorial: function(){
        alert("Reserva guardada en el historial");
    },
    leerPendientes: function(){
        almacen.db = window.openDatabase("hotelApp", "1.0", "HotelApp",2000);
        almacen.db.transaction(almacen.enviarPendientes,almacen.error,almacen.confirmarPendientes);
    },
    enviarPendientes: function(tx){
        tx.executeSql("SELECT * FROM reservas_pendientes",[],function(tx,resultados){
            var cantidad = resultados.rows.length;
            if (cantidad>0){
                for(var i=0; i<cantidad; i++){
                    var th = resultados.rows.item(i).tipoh;
                    var np = resultados.rows.item(i).nump;
                    var nh = resultados.rows.item(i).numh;
                    var nd = resultados.rows.item(i).numd;
                    fn.enviarReservas(th,np,nh,nd);
                    tx.executeSql("DELETE FROM reservas_pendientes WHERE id="+ resultados.rows.item(i).id);
                }
            }
        });
    },
    confirmarPendientes: function(){
        alert("Sincronizado correctamente con el servidor");
    },
    registrosHistorial: function(){
        almacen.db = window.openDatabase("hotelApp", "1.0", "HotelApp",2000);
        almacen.db.transaction(almacen.leerHistorial,almacen.error,almacen.exitoHistorial);
    },
    leerHistorial: function(tx){
        //tx.executeSql('CREATE TABLE IF NOT EXISTS historial (id INTEGER PRIMARY KEY,tipoh,nump, numh, numd)');
        //tx.executeSql('INSERT INTO historial (tipoh,nump,numh,numd) values ("suite", "1", "1", "3")');
        tx.executeSql("SELECT * FROM historial",[],almacen.prueba, null);
    },
    prueba: function(tx,resultados){
        var cantidad = resultados.rows.length;
        var resultado = '<tr><td>No hay reservas</td></tr>';
        if (cantidad>0){
            resultado = '';
            for(var i=0; i<cantidad; i++){
                var th = resultados.rows.item(i).tipoh;
                var np = resultados.rows.item(i).nump;
                var nh = resultados.rows.item(i).numh;
                var nd = resultados.rows.item(i).numd;
                resultado+="<tr><td>" + th+"</td><td>" + np +"</td><td>" + nh +"</td><td>" + nd +"</td></tr>";
            }
        }
        $("#listaHistorial").html(resultado);
    },
    
    registrosPendientes: function(){
        almacen.db = window.openDatabase("hotelApp", "1.0", "HotelApp",2000);
        almacen.db.transaction(almacen.leerPendientes,almacen.error,almacen.exitoHistorial);
    },
    leerPendientes: function(tx){
        //tx.executeSql('CREATE TABLE IF NOT EXISTS historial (id INTEGER PRIMARY KEY,tipoh,nump, numh, numd)');
        //tx.executeSql('INSERT INTO historial (tipoh,nump,numh,numd) values ("suite", "1", "1", "3")');
        tx.executeSql('CREATE TABLE IF NOT EXISTS reservas_pendientes (id INTEGER PRIMARY KEY,tipoh,nump, numh, numd)');
        tx.executeSql("SELECT * FROM reservas_pendientes",[],almacen.pruebab, null);
    },
    
    pruebab: function(tx,resultados){
        var cantidad = resultados.rows.length;
        var resultado = '<tr><td>No hay reservas</td></tr>';
        if (cantidad>0){
            resultado = '';
            for(var i=0; i<cantidad; i++){
                var th = resultados.rows.item(i).tipoh;
                var np = resultados.rows.item(i).nump;
                var nh = resultados.rows.item(i).numh;
                var nd = resultados.rows.item(i).numd;
                resultado+="<tr><td>" + th+"</td><td>" + np +"</td><td>" + nh +"</td><td>" + nd +"</td></tr>";
            }
        }
        $("#listaPendiente").html(resultado);
    },
    
    exitoHistorial: function(){
        alert("Se debeo mostrar historial");
    }


};//MENSAJE DE ERROR AL INSERT? ID NO SE GUARDA?
