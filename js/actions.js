var fn = {
	init: function(){

		 if(!fn.estaRegistrado()){
		 	//window.location.href = "#registro";
		 }

		// BOTONES
		$("#registro ul[data-role  = listview] a").tap(mc.start);
		$("#registro div[data-role = footer] a").tap(fn.registar);
		$("#nr1 ul[data-role = listview] a").tap(fn.seleccionarTipo);
        $("#nr1 div[data-role = navbar] li").tap(fn.nr1Siguiente);
        $("#nr2 div[data-role = footer] a").tap(fn.nr2EnviarRegistro);
        $("#botonHistorial").tap(fn.mostrarHistorial);
        $("#botonPendientes").tap(fn.mostrarPendientes);
        $("#botonUbicacion").tap(fn.mostrarUbicacion);
        $("#boton-galeria").tap(fn.llenarGaleria);
        
        

        //ASOCIAR EVENTO PARA SINCRONIZAR.
        document.addEventListener("online",fn.sincronizarReservasPendientes,false);
        
        //poner fecha
        fn.ponerFecha();
	},
    
    mostrarUbicacion: function(){
        //location.reload();
        /*function mapa(){
            geolocation.getPosition();
        }*/
        $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDsyGa_tS6Poom9liMlMNF_1Tuz1NxNI9c&callback=mapa');
    },    
    
    mostrarHistorial: function(){
        $.mobile.loading("show");
        almacen.registrosHistorial();
    },

    mostrarPendientes: function(){
        $.mobile.loading("show");
        almacen.registrosPendientes();
    },
    
    nr2EnviarRegistro : function(){
        $.mobile.loading("show");
        var tipoHabitacion = $("#nr1").attr("th");
        var numPersonas = $("#resPer").val();
        var numHabitaciones = $("#resHab").val();
        var numDias = $("#resDias").val();

        if(conexion.estaConectado()){
            //SI ESTA CONECTADO ENVIAR LA RESERVACION
            //alert("DISPOSITIVO CONECTADO");
            fn.enviarReservas(tipoHabitacion,numPersonas,numHabitaciones,numDias);
            
        }else{
            //GUARDAR LAS RESERVAS EN UN DISPOSITIVO
            //alert("DISPOSITIVO DESCONECTADO");
            almacen.guardarReserva(tipoHabitacion,numPersonas,numHabitaciones,numDias);
        }
        
        $("#nr1 ul[data-role = listview] a").css("background-color","");
        $("#nr1").removeAttr("th");
        //$(#nr2 select").prop("selectedIndex",0).selectmenu("refresh",true);
        $("#nr2 select").prop("selectedIndex", 0).selectmenu("refresh", true);
        window.location.href="#home";
        
    },

    sincronizarReservasPendientes: function(){
        //ALMACEN DEBE DE ENVIARLAS
        //alert('Llama a sincronizar');
        almacen.leerPendientes();
    },

    enviarReservas: function(th,np,nh,nd){
        //alert(th+"-"+np+"-"+nh+"-"+nd);
        $.ajax({
			method: "POST",
			url: "http://carlos.igitsoft.com/apps/test.php",
			data: {
				tipo: th,
				habitaciones: nh,
				personas: np,
                dias: nd
			}/*,
			error: function(){
				alert("Error de conexion con AJAX");
			}*/

		}).done(function(respuesta){
			if(respuesta == 1){
				//Agregar datos la
                almacen.agregarHistorial(th,np,nh,nd);
			}else{
				alert("Error al guardar reserva en el servidor");
			}
		});
        $.mobile.loading("hide");
    },



    nr1Siguiente : function(){
        if ($(this).index()==1){
            if($("#nr1").attr("th")!=undefined){
                window.location.href="#nr2";
            }else{
                alert("Error es necesario seleecionar un tipo de habitacion");
            }
        }
    },

	seleccionarTipo: function(){
        console.log("1231231231");
        $("#nr1 ul[data-role = listview] a").css("background-color","");
        $("#nr1").attr("th",$(this).text());
        $(this).css("background-color","#38C");
	},

	deviceready: function(){
		document.addEventListener("deviceready", fn.init, false)
	},

	estaRegistrado: function(){
		if(window.localStorage.getItem("user") != undefined ){
			return true;
		}

		return false;
	},

	registar: function(){
        $.mobile.loading("show");
		// OBTENER LOS DATOS
		var nombre = $("#regNom").val();
		var email  = $("#regEmail").val();
		var tel    = $("#regTel").val();
		var foto   = $("#fotoTomada").attr("rel");

		// VALIDAR DATOS
		try{
			if(typeof nombre !== "string"){
				throw new Error("El nombre no es valido");
			}

			if(Number.isNaN(Number(tel))){
				throw new Error("El telefono no es valido");
			}

			if(email == '' || foto == undefined || foto == ''){
				throw new Error("La foto y el email no son validos");
			}

			fn.enviarRegistro(nombre, email, tel, foto);

		}catch(error){
			// MANDAR ALERTA DEL ERROR
			navigator.notification.alert(error);
		}
	},

	enviarRegistro: function(nombre, email, tel, foto){
		$.ajax({
			method: "POST",
			url: "http://carlos.igitsoft.com/apps/test.php",
			data: {
				nom: nombre,
				mail: email,
				tel: tel
			},
			error: function(){
                $.mobile.loading("hide");
				alert("Error de conexion con AJAX");
			}

		}).done(function(msg){
			if(msg == 1){
				ft.start(foto);

			}else{
				navigator.notification.alert("Error al enviar datos al servidor, Mensaje: "+msg);
			}
            $.mobile.loading("hide");
		});
        
	},
    ponerFecha: function(){
        var hoy= new Date();
        var dia=hoy.getDate();
        var mes=hoy.getMonth()+1;
        var anio=hoy.getFullYear();
    
        if(dia< 10){
            dia="0"+ dia;
        }

        if(mes<10){
            mes="0"+ mes;
        }
        hoy=dia + "-" + mes + "-" + anio;
        $(".fecha").html(hoy);
    },
    
    llenarGaleria: function(){
            $.ajax({
					type: "POST",
					url: "http://ismaelharo.com.mx/phonegap/fotos.php",
                data:{
                    
                },
			error: function(){
				alert("Error de conexion con AJAX");
			}

		}).
           done(function(msg){
            //alert(msg);
            var obj = jQuery.parseJSON(msg);
            $impar=1;
                Object.keys(obj).forEach(function(key) {
                    //console.log(key, obj[key]);
                    if($impar==1){
                     $("#gallery" ).append("<div class='ui-block-a'><img class='foto-galeria' src='"+obj[key]+"'/></div>" );    
                     $impar=0;
                }
                else{
                    $("#gallery" ).append( "<div class='ui-block-b'><img class='foto-galeria' src='"+obj[key]+"'/></div>" );    
                    $impar=1;
                }
                });
                $(".foto-galeria").tap(fn.mostrarGaleria);
		});
        
    },
    mostrarGaleria: function(){
        
        $("#foto").html($(this).clone());
        $.mobile.changePage($("#foto_individual"));
    }
};

//$(fn.deviceready);

$(fn.init);
