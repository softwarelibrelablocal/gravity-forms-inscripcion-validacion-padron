var id_formulario_gravity = 2;
var reglas_validacion_gravity = '0,10,10';


// Onload ***********************

jQuery(function() {
	console.log('Página cargada correctamente');
	
	//ponemos el indicador a 0 y reseteamos las reglas de Gravity
	jQuery('.flag input').val(0);
	gf_lanzar_gfvalidacion(id_formulario_gravity,reglas_validacion_gravity);
	
	jQuery('#validar_documento').click(function(){
		var documento = jQuery('.numero_documento  input').val();
		if(documento != ''){
			if(!isNaN(documento)){
				documento = gf_pad (documento, 9);
				jQuery('.numero_documento  input').val(documento);
			}			
			
			validar_padron_documento(documento);
			
		}
		
	});
});


function validar_padron_documento(documento){
	//llamada ajax al webservice
	//var actividad = '30';
	var url = "https://tuservidorwebservice/wp-json/mg-dbq2json/v1/services?s=padron-dni&u=APIKEY-USUARIO&dni=" + documento;

	jQuery.ajax({
		type : 'GET',
		url: url
		}).done(function(respuesta) {
			console.log(respuesta);
			console.log(typeof(respuesta));
			//console.log(respuesta[0]);
			//console.log(respuesta.code);
			
			if(respuesta['message'] ){
				console.log('No hay registros');
				jQuery('.flag input').val(0);			
				gf_lanzar_gfvalidacion(id_formulario_gravity,reglas_validacion_gravity);
				return false;
			}else{
				
				var direccion = respuesta[0].DIREC;
				var fecha_nacimiento = respuesta[0].FECNAC;
				var nif = respuesta[0].NIF;
				var nombre_compuesto = respuesta[0].NOMBRE;
				
				var apellido_compuesto = nombre_compuesto.split(",")[0];
				var nombre = nombre_compuesto.split(",")[1];
				
				// El nombre lo devuelve con este formato Apellido1*Apellido2,Nombre
				var arrApellidos = apellido_compuesto.split("*");
				
				var numero_elementos = arrApellidos.length;
				
				switch(numero_elementos) {
					case 1:
						var apellido1 = arrApellidos[0];
						var apellido2 = '';
						break;
					case 2:
						var apellido1 = arrApellidos[0];
						var apellido2 = arrApellidos[1];
						break;
				}
				
				console.log('Direccion: ' + direccion);
				console.log('Fecha Nacimiento: ' + fecha_nacimiento);
				console.log('Documento: ' + nif);
				console.log('Nombre: ' + nombre);
				console.log('Apellido1: ' + apellido1);
				console.log('Apellido2: ' + apellido2);
				
				jQuery('.nombre input').val(nombre);
				jQuery('.apellido1 input').val(apellido1);
				jQuery('.apellido2 input').val(apellido2);
				jQuery('.direccion input').val(direccion);
				jQuery('.fecha_nacimiento input').val(fecha_nacimiento);
				
				jQuery('.flag input').val(500);
				
				gf_lanzar_gfvalidacion(id_formulario_gravity,reglas_validacion_gravity);

				
			}
			
			
			
			
			
			
			
		}).fail(function(resp) {
	        console.log(resp);
	    }).always(function() {
	        console.log("completo");
	    });

	return true;
}
	