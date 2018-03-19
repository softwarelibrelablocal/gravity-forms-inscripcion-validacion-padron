var anionac = '';
var mesnac = '';
var camp = '2';
var contadorJ1Q = 1;
var contadorJ2Q = 1;
var numActividadesJ1Q = 0;
var numActividadesJ2Q = 0;
var edad = 0;

function pedir_campamentos(){
		obtener_anio_mes_nac();
		jQuery('#input_39_123').val(anionac);
		comboj1q = carga_combo_actividades('30','#cmb_j1q',numActividadesJ1Q,'#input_39_80');
		numActividadesJ1Q = comboj1q;
		comboj2q = carga_combo_actividades('31','#cmb_j2q',numActividadesJ2Q,'#input_39_97');
		numActividadesJ2Q = comboj2q;
		lanzar_gfvalidacion('39','0,66,72,68,71,67,73,74,75,76,77,98,100,102,104,106,108,110,112,114,116,63,122,139,125,128,130,132,141,143,135,127');
}

(function($) {
	
	//Campos:
	// 19 -> Fecha Nacimiento
	// cmb_j1q -> combo actividades 1ª quincena julio
	
	//Convertir nombres a mayúsculas
	$(".mayusculas input").change(function() {
		$(this).val($(this).val().toUpperCase());
	});
	
	var pagina_actual = $('#gform_target_page_number_39').val();
	//en la pagina 5 carga los combos de los campas
	
	if(pagina_actual =='5'){
		pedir_campamentos();
	}
	
	//Fecha de nacimiento
	//var modalAlertanacimiento = $('#campamentosUrbanos_panelAlerta').remodal();
		
	$("#input_39_19").change(function() {

		// mensaje de alerta al cambiar fecha nacimiento
		$('[data-remodal-id = modalAvisoFecha]').remodal().open();
		
		//resetear campamentos
		// input preferencias (julio)
		$('.sololectura input').each(function(i, obj) {
		    $(obj).val('');
		});
		// input el código oculto de la preferencia (julio)
		$('.codpreferencia input').each(function(i, obj) {
		    $(obj).val('');
		});
		// ponemos los input->radio a NO
		$('.opcSiNo input[type=radio]').each(function(i, obj) {
		    $(obj).val('NO');
		});
	});

	// ponemos los campos input de preferencias cmo solo lectura
	$('.sololectura input').each(function(i, obj) {
	    $(obj).attr('readonly', 'readonly');
	});

	// añadir preferencia actividad julio 1ª quincena
	$("#btn_j1q_ok").click(function() {
		if (jQuery('#cmb_j1q option:selected').val() != '') {
			jQuery(".J1Q_" + contadorJ1Q + " input").val(jQuery("#cmb_j1q option:selected").text());
			jQuery(".J1Q_cod" + contadorJ1Q + " input").val(jQuery("#cmb_j1q option:selected").val());
			
			jQuery("#cmb_j1q option:selected").remove();
			jQuery("#cmb_j1q option:selected").text();
			jQuery('#cmb_j1q option[value=""]').attr('selected','selected');
			contadorJ1Q++;
		}
	});

	// añadir preferencia actividad julio 2ª quincena
	$("#btn_j2q_ok").click(function() {
		if (jQuery('#cmb_j2q option:selected').val() != '') {
			jQuery(".J2Q_" + contadorJ2Q + " input").val(jQuery("#cmb_j2q option:selected").text());
			jQuery(".J2Q_cod" + contadorJ2Q + " input").val(jQuery("#cmb_j2q option:selected").val());
			
			jQuery("#cmb_j2q option:selected").remove();
			jQuery("#cmb_j2q option:selected").text();
			jQuery('#cmb_j2q option[value=""]').attr('selected','selected');
			contadorJ2Q++;
		}
	});
	
	// eliminar preferencia actividad julio 1ª quincena
	$("#btn_j1q_ok_quitar").click(function() {
		var clasePoner = ".J1Q_cod" + (contadorJ1Q - 1) + " input";
		jQuery("#cmb_j1q").append('<option value="' + jQuery(clasePoner).val() +'">' + jQuery(".J1Q_" + (contadorJ1Q-1) + " input").val() + '</option>');
		// quitamos el texto de la preferencia de la útlima utilizada (contador-1)
		jQuery(".J1Q_" + (contadorJ1Q-1) + " input").val('');
		// quitamos el código de la preferencia del input hidden
		jQuery(".J1Q_cod" + (contadorJ1Q-1) + " input").val('');
		contadorJ1Q--;
	});

	// eliminar preferencia actividad julio 2ª quincena
	$("#btn_j2q_ok_quitar").click(function() {
		var clasePoner = ".J2Q_cod" + (contadorJ2Q - 1) + " input";
		jQuery("#cmb_j2q").append('<option value="' + jQuery(clasePoner).val() +'">' + jQuery(".J2Q_" + (contadorJ2Q-1) + " input").val() + '</option>');
		// quitamos el texto de la preferencia de la útlima utilizada (contador-1)
		jQuery(".J2Q_" + (contadorJ2Q-1) + " input").val('');
		// quitamos el código de la preferencia del input hidden
		jQuery(".J2Q_cod" + (contadorJ2Q-1) + " input").val('');
		contadorJ2Q--;
	});

	$(document).on('opening', '.modalJ1Q', function () {
		if (contadorJ1Q == 11 || contadorJ1Q > numActividadesJ1Q){
			$('#div_J1Q_opc1').hide();
			$('#div_J1Q_opc2').show();
		} else {
			$('#div_J1Q_opc1').show();
			$('#div_J1Q_opc2').hide();

		}
	});

	$(document).on('opening', '.modalJ2Q', function () {
		if (contadorJ2Q == 11 || contadorJ2Q > numActividadesJ2Q){
			$('#div_J2Q_opc1').hide();
			$('#div_J2Q_opc2').show();
		} else {
			$('#div_J2Q_opc1').show();
			$('#div_J2Q_opc2').hide();

		}
	});

	$(document).on('opening', '.modalJ1Q_quitar', function () {
		if (contadorJ1Q <= 1){
			$('#div_J1Q_opc1_quitar').hide();
			$('#div_J1Q_opc2_quitar').show();
		} else {
			var claseEliminar = ".J1Q_" + (contadorJ1Q - 1) + " input";
			$('#mensaje_quitar_J1Q').text($(claseEliminar).val());
			$('#div_J1Q_opc1_quitar').show();
			$('#div_J1Q_opc2_quitar').hide();

		}
	});

	$(document).on('opening', '.modalJ2Q_quitar', function () {
		if (contadorJ2Q <= 1){
			$('#div_J2Q_opc1_quitar').hide();
			$('#div_J2Q_opc2_quitar').show();
		} else {
			var claseEliminar = ".J2Q_" + (contadorJ2Q - 1) + " input";
			$('#mensaje_quitar_J2Q').text($(claseEliminar).val());
			$('#div_J2Q_opc1_quitar').show();
			$('#div_J2Q_opc2_quitar').hide();

		}
	});
	
})( jQuery );

function obtener_anio_mes_nac(){
	if (!jQuery("#input_39_19").val() == '') {
		var strFechaNac = jQuery("#input_39_19").val();
		var arrayFechaNac = strFechaNac.split('/');
		anionac = arrayFechaNac[2];
		mesnac = arrayFechaNac[1];
	} else {
		anionac = '1000';
		mesnac = '13';
	}
}

function carga_combo_actividades(actividad,strcombo,numactividades,strinput){
	//llamada ajax al webservice
	//var actividad = '30';
	var url = "http://10.194.100.140/json/wp-json/mg-dbq2json/v1/services?s=cursos_verano&u=223awefawdf3&anionac=" + anionac + "&mesnac=" + mesnac + "&camp=" + camp + "&actividad=" + actividad;
	var parametros = {"url" : url};

	jQuery.ajax({
		async: false, 
        cache: false,
		data:  parametros,
		type : 'POST',
		url: "https://inscripciones.rivasciudad.es/wp-content/themes/Divi-child/page-proxywebservice.php"
		}).done(function(respuesta) {
			var jsonResponse = JSON.parse(respuesta);
			if (jsonResponse[0].encuentra == "SI") {
				console.log('Entra');
				// hay actividades porque ha devuelto el nombre
				jQuery.each(jsonResponse, function(id,value){
					jQuery(strcombo).append('<option value="'+value.ID_ACTIVIDAD+'">'+value.NOMBRE+'</option>');
					numactividades++;
			    });
			    jQuery(strinput).val(numactividades);
			} else {
				console.log('No ha podido cargar el combo ' + strcombo);
				jQuery(strcombo).find('option:not(:first)').remove();
				numactividades = 0;
				jQuery(strinput).val(numactividades);
				//lanzar_gfvalidacion('38','0');
			}				
		}).fail(function(resp) {
	        console.log(resp.responseText);
	    }).always(function() {
	        console.log("completo");
	    });

	return numactividades;
}
	
function validar_formulario(){
	var dni = jQuery('#input_38_2').val();
	var nie = jQuery('#input_38_9').val();
	var fechanac = jQuery('#input_38_5').val();
	var tipo_documento = jQuery( "#input_38_8 option:selected" ).val();
	
	jQuery("#input_38_4").val('0');
	jQuery('.erroredad').text('');
	jQuery('.errordni').text('');
	
	if(tipo_documento == 'DNI' && dni != ''){
		documento = left_pad(dni, 9);
	}else{
		documento = nie;
	}	
	
	//validar fecha
	if(!validar_edad(fechanac)){
		
		return false;
	}
	
	if(documento != '' && fechanac != ''){
		validar_webservice(documento,fechanac);
		return true;
	}
	return false;
}

function validar_webservice(documento, fechanac){
	if (documento == '' || fechanac == '') {
		jQuery("#input_38_4").val('0');
		return false;
	}else{
		consulta_webservice(documento, fechanac);
		return true;
	}
	return false;
}

function consulta_webservice(documento, fechanac){
		
		if(documento != '' && fechanac != ''){			
			buscaDniNie(documento,fechanac);
			return true;			
		}
		return false;
}

function buscaDniNie(documento,fechanac) {
	var mensaje = '';
	//llamada ajax al webservice
	var url = "http://10.194.100.140/json/wp-json/mg-dbq2json/v1/services?s=padron_dni&u=w3r23awef34&dni=" + documento + "&fechanac=" + fechanac;
	var parametros = {"url" : url};
	
	jQuery.ajax({
		data:  parametros,
		type : 'POST',
		url: "https://inscripciones.rivasciudad.es/wp-content/themes/Divi-child/page-proxywebservice.php",
		beforeSend: function () {
			//jQuery("#resultado").html("Procesando, espere por favor...");
		},
		success:  function (response) {
			var error = 0;
			var jsonResponse = JSON.parse(response);
			
			if (typeof jsonResponse[0].NOMBRE !== 'undefined') {
				// está empadronado porque ha devuelto el nombre
				//jQuery("#input_38_4").val('500');
				console.log(jsonResponse[0].NOMBRE);
				jQuery("#input_38_4").val('500');
				jQuery('.erroredad').text('');
				jQuery('.errordni').text('');
				lanzar_gfvalidacion('38','0');
			}else{
				jQuery("#input_38_4").val('0');
				if (jsonResponse.code == 'no-rows-found') {
					mensaje = 'Fecha de nacimiento y/o ' + jQuery( "#input_38_8 option:selected" ).val() + ' no encontrados.';
				} else {
					mensaje = 'Ha ocurrido un error al comprobar el número de documento. Por favor contacte con el Ayuntamiento.';
				}
				jQuery('.errordni').text(mensaje);
				jQuery("#input_38_4").val('0');
				lanzar_gfvalidacion('38','0');
			}				
		}
	});

	return true;
}


function calcularEdad(fechanac) {

    // Calculamos la edad

        var valoresFecha=fechanac.split("/");
        var dia = valoresFecha[0];
        var mes = valoresFecha[1];
        var ano = valoresFecha[2];

		// cogemos los valores actuales
        var fecha_hoy = new Date();
        var ahora_ano = fecha_hoy.getYear();
		// los meses en JS van del 0 a 11 por lo que sumamos 1
        var ahora_mes = fecha_hoy.getMonth()+1;
        var ahora_dia = fecha_hoy.getDate();

        // realizamos el calculo
        var intedad = (ahora_ano + 1900) - ano;

        if ( ahora_mes < mes ) {
            intedad--;
        }

        if ((mes == ahora_mes) && (ahora_dia < dia)) {
            intedad--;
        }

        if (intedad > 1900) {
            intedad -= 1900;
        }
		
		return intedad;
}


function left_pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

//reglas_campos es un string con las reglas de los campos a lazar (Ej: '0,4,8'). El cero siempre se pone porque es la validacion del boton submit
function lanzar_gfvalidacion(id_formulario,reglas_campos){
	if(typeof __gf_timeout_handle !== "undefined"){
		clearTimeout(__gf_timeout_handle);
	}
	__gf_timeout_handle = setTimeout("gf_apply_rules(" + id_formulario + ",[" + reglas_campos + "])", 300);
}
